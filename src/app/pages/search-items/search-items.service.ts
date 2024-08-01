import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs
import { BehaviorSubject, Observable } from 'rxjs';
// constantes
import { accessTokenKey } from 'src/app/core/constants/constants';
// servicios
import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';
import { TrackInfoInterface } from 'src/app/core/interfaces/TrackInfoInterface';
import { ArtistInterface } from 'src/app/core/interfaces/ArtistsInterface';
import { AlbumDataInterface } from 'src/app/core/interfaces/AlbumDataInterface';
import { PlaylistDataInterface } from 'src/app/core/interfaces/PlaylistsDataInterface';


@Injectable({
    providedIn: 'root'
})
export class SearchItemsService {
    private accessTokenKey: string = accessTokenKey;
    private dataEmitterService: DataEmitterService;
    private httpClient: HttpClient;
    private httpHeaders: any;
    private token: string = "";


    constructor(dataEmitterService: DataEmitterService, httpClient: HttpClient) {
        this.dataEmitterService = dataEmitterService;
        this.httpClient = httpClient;

        this.token = localStorage.getItem(this.accessTokenKey)!;
        this.httpHeaders = new HttpHeaders({ "Authorization": "Bearer " + this.token });
    }


    public doSearchContentInSpotifyAPI(spotifyEndpoint: string): Observable<any> {
        return this.httpClient.get(spotifyEndpoint, { headers: this.httpHeaders });
    }

    public loadAndBuildAlbums(albums: any): AlbumDataInterface[] {
        let albumsData: AlbumDataInterface[] = [];

        albums.items.forEach((albums: any) => {
            albumsData.push(this.doBuildAlbumDataObject(albums));
        });


        return albumsData;
    }

    public loadAndBuildArtists(artists: any): ArtistInterface[] {
        let artistsData: ArtistInterface[] = [];

        artists.items.forEach((artists: any) => {
            try {
                artistsData.push(this.doBuildArtistInfoObject(artists));
            }
            catch (err) {
                // console.error("SearchItemsService.loadAndBuildArtists() -> No se ha podido construir el objeto ArtistInterface", err);
            }
        });

        return artistsData;
    }

    public loadAndBuildPlaylists(playlists: any): PlaylistDataInterface[] {
        let playlistsData: PlaylistDataInterface[] = [];

        playlists.items.forEach((playlists: any) => {
            playlistsData.push(this.doBuildPlaylistInfoObject(playlists));
            // playlistsData = this.doSortByPopularity(playlistsData);
        });


        return playlistsData;
    }

    public loadAndBuildTracks(tracks: any): TrackInfoInterface[] {
        let tracksListAux: TrackInfoInterface[] = [];

        // recorrer cada item del array tracks y añadirlo a la lista de tracks formateado y filtrado
        tracks.items.forEach((track: any) => {
            tracksListAux.push(this.doBuildTrackInfoObject(track));
            tracksListAux = this.doSortByPopularity(tracksListAux);
            
            // obtener los 4 tracks más populares
            tracksListAux = tracksListAux.slice(0, 4);
        });

        return tracksListAux;
    }



    // * METODOS PRIVADOS
    // * METODOS PRIVADOS
    // * METODOS PRIVADOS

    private doBuildAlbumDataObject(album: any): AlbumDataInterface {
        let albumListAux: AlbumDataInterface = {
            api_href: album.href,
            api_id: album.id,
            artistName: album.name,
            idArtist: album.id,
            img_url: album.images[0].url,
            name: album.name,
            release_date: album.release_date,
            spotify_url: album.external_urls.spotify,
            total_tracks: album.total_tracks,
        };

        return albumListAux;
    }

    private doBuildArtistInfoObject(artist: any): ArtistInterface {
        const albumData: ArtistInterface = {
            external_url: artist.external_urls.spotify,
            genres: artist.genres,
            id: artist.id,
            image_url: artist.images[0].url,
            name: artist.name,
        };

        return albumData;
    }

    private doBuildPlaylistInfoObject(playlist: any): PlaylistDataInterface {
        const playlistData: PlaylistDataInterface = {
            description: playlist.description,
            idPlaylist: playlist.id,
            imageUrl: playlist.images[0].url,
            name: playlist.name,
            SpotifyApiSongsUrl: playlist.tracks.href,
            SpotifyApiUrl: playlist.href,
            SpotifyExternalUrl: playlist.external_urls.spotify,
            SpotifyOwnerUser: playlist.owner.display_name,
            SpotifyOwnerUserProfile: playlist.owner.href
        };

        return playlistData;
    }

    private doBuildTrackInfoObject(track: any): TrackInfoInterface {
        const songTime: string = this.doFormatMilliseconds((parseInt(track.duration_ms)));

        const tracksObjAux: TrackInfoInterface = {
            apiHref: track.href,
            externalUrl: track.external_urls.spotify,
            group: track.artists[0].name,
            idTrack: track.id,
            imgUrl: track.album.images[0].url,
            popularity: track.popularity,
            time: songTime,
            tittle: track.name,
            uri: track.uri,
        };

        return tracksObjAux;
    }

    private doFilterFirstNTracks(tracks: TrackInfoInterface[], numberOfTracks: number): TrackInfoInterface[] {
        return tracks.slice(0, numberOfTracks);
    }

    /** Formatear milisegundos en formato minutos:segundos mm:ss */
    private doFormatMilliseconds(ms: number): string {
        // Convertir a segundos
        let totalSeconds = Math.floor(ms / 1000);

        // Obtener minutos y segundos restantes
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        // Formatear en mm:ss
        let formattedMinutes = minutes.toString().padStart(2, '0');
        let formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    private doSortByPopularity(objectList: any[]): any[] {
        return objectList.sort((a, b) => b.popularity - a.popularity);
    }
}