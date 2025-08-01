import { Component, OnInit } from '@angular/core';

// constantes
import { SpotifyUserLikedSongs, SpotifyUserPlaylists, accessTokenKey } from 'src/app/core/constants/constants';

// rxjs
import { BehaviorSubject, Observable } from 'rxjs';

// servicios
import { UserPlaylistsService } from './user-playlists.service';
import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';

// interfaces y clases
import { UserLikedSongs } from './interfaces/UserLikedSongs';
import { PlaylistDataInterface } from 'src/app/core/interfaces/PlaylistsDataInterface';


@Component({
    selector: 'home-user-playlists',
    templateUrl: './user-playlists.component.html',
    styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {
    public userPlaylists: BehaviorSubject<PlaylistDataInterface[]> = new BehaviorSubject<PlaylistDataInterface[]>([]);
    public userPlaylists$: Observable<PlaylistDataInterface[]> = this.userPlaylists.asObservable();

    public userLikedSongs: BehaviorSubject<UserLikedSongs> = new BehaviorSubject<UserLikedSongs>(new UserLikedSongs());
    public userLikedSongs$: Observable<UserLikedSongs> = this.userLikedSongs.asObservable();

    private accessToken: string = "";
    private spotifyUserAlbumsEndpoint: string = SpotifyUserPlaylists;
    private spotifyUserLikedSongs: string = SpotifyUserLikedSongs;

    private dataEmiterService: DataEmitterService;
    private userPlaylistsService: UserPlaylistsService;

    constructor(dataEmiterService: DataEmitterService, userPlaylistsService: UserPlaylistsService) {
        this.dataEmiterService = dataEmiterService;
        this.userPlaylistsService = userPlaylistsService;
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }

    ngOnInit() {
        this.doLoadAccessTokenFromLocalStorage(accessTokenKey);
        this.getUserLikedSongs(this.spotifyUserLikedSongs, this.accessToken);
        this.getUserPlaylists(this.spotifyUserAlbumsEndpoint, this.accessToken);
    }

    private doBuildUserPlaylistsList(apiResponse: any): PlaylistDataInterface[] {
        let playlistDataList: PlaylistDataInterface[] = [];

        apiResponse.items.forEach((element: any) => {
            let playlistDataAux: PlaylistDataInterface = {
                description: element.description,
                idPlaylist: element.id,
                imageUrl: element.images[0].url,
                name: element.name,
                SpotifyApiSongsUrl: element.tracks.href,
                SpotifyApiUrl: element.href,
                SpotifyExternalUrl: element.external_urls.spotify,
                SpotifyOwnerUser: element.owner.display_name,
                SpotifyOwnerUserProfile: element.owner.href
            }

            playlistDataList.push(playlistDataAux);
        });

        return playlistDataList;
    }

    private doBuildUserLikedSongs(apiResponse: any): UserLikedSongs {
        let playlistDataList: UserLikedSongs = new UserLikedSongs();

        playlistDataList.numberOfSongs = apiResponse.total;
        playlistDataList.songsObjList = apiResponse.items;
        playlistDataList.SpotifyApiNextSongsUrl = apiResponse.next;
        playlistDataList.SpotifyApiEndpoint = apiResponse.href;

        return playlistDataList;
    }

    private doLoadAccessTokenFromLocalStorage(accessTokenKey: string): void {
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }

    private getUserLikedSongs(userLikedSongsEndpoint: string, token: string): void {
        this.userPlaylistsService.getUserPlaylists(userLikedSongsEndpoint, token)
            .subscribe((apiResponse: any) => {
                let userLikedSongs: UserLikedSongs = this.doBuildUserLikedSongs(apiResponse);
                
                this.userLikedSongs.next(userLikedSongs);
                this.dataEmiterService.emitUserLikedSongs(userLikedSongs);
            });
    }

    private getUserPlaylists(userPlaylistsEndpoint: string, token: string): void {
        this.userPlaylistsService.getUserPlaylists(userPlaylistsEndpoint, token)
            .subscribe((apiResponse: any) => {
                let userPlaylists: PlaylistDataInterface[] = this.doBuildUserPlaylistsList(apiResponse);
                
                this.userPlaylists.next(userPlaylists);
                this.dataEmiterService.emitUserPlaylistData(userPlaylists);
            });
    }
}
