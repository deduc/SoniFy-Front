import { Injectable } from '@angular/core';

// rxjs
import { BehaviorSubject, Observable } from 'rxjs';

// interfaces y clases
import { AlbumDataInterface } from '../interfaces/AlbumDataInterface';
import { ArtistCardInfoInterface } from 'src/app/pages/home/components/user-top-artists/Interfaces/ArtistCardInfoInterface';
import { PlaylistDataInterface } from '../interfaces/PlaylistsDataInterface';
import { TopArtistListInterface } from '../interfaces/TopArtistListInterface';
import { UserLikedSongs } from 'src/app/pages/home/components/user-playlists/interfaces/UserLikedSongs';



@Injectable({
    providedIn: 'root'
})
export class DataEmitterService {
    public albumInfoList = new BehaviorSubject<AlbumDataInterface[]>([]);
    public datosAlbumInfoList = this.albumInfoList.asObservable();

    public topArtistList = new BehaviorSubject<TopArtistListInterface>({ href: "", limit: 0, next: "", total: 0, items: [] });
    public datosTopArtistList = this.topArtistList.asObservable();

    // Información sobre los top artistas del usuario
    public artistCardInfoList = new BehaviorSubject<ArtistCardInfoInterface[]>([]);
    public datosArtistCardInfoList = this.artistCardInfoList.asObservable();

    public accessToken = new BehaviorSubject<string>("access_token_null_value");
    public datosAccessToken = this.accessToken.asObservable();

    public userPlaylistData = new BehaviorSubject<PlaylistDataInterface[]>([]);
    public dataUserPlaylists = this.userPlaylistData.asObservable();

    public userLikedSongs = new BehaviorSubject<UserLikedSongs>({ numberOfSongs: 0, songsObjList: [], SpotifyApiNextSongsUrl: "", SpotifyApiEndpoint: "" });
    public dataUserLikedSongs = this.userLikedSongs.asObservable();

    // ========================
    // ========Emisores========
    // ========================

    public emitAlbumInterface(albumInfoList: AlbumDataInterface[]) {
        // console.log("DataEmitterService.emitAlbumInterface() ->", albumInfoList);
        this.albumInfoList.next(albumInfoList);
    }

    public emitTopArtistListInterface(topArtistList: TopArtistListInterface) {
        // console.log("DataEmitterService.emitTopArtistListInterface() ->", topArtistList);
        this.topArtistList.next(topArtistList);
    }

    // Invocado desde MyArtistsComponent
    public emitArtistCardInfo(artistInfoList: ArtistCardInfoInterface[]) {
        // console.log("DataEmitterService.emitArtistCardInfo() ->", artistInfoList);
        this.artistCardInfoList.next(artistInfoList);
    }

    // invocado desde TokenService
    public emitAccessToken(token: string) {
        console.log("DataEmitterService.emitAccessToken() ->", token);
        this.accessToken.next(token);
    }

    public emitUserLikedSongs(userLikedSongs: UserLikedSongs) {
        this.userLikedSongs.next(userLikedSongs);
    }

    public emitUserPlaylistData(playlistData: PlaylistDataInterface[]) {
        this.userPlaylistData.next(playlistData);
    }

    // ====================================
    // ============Suscriptores============
    // ====================================

    // Me suscribo desde MyArtistsComponent
    public getArtistCardInfo(): Observable<ArtistCardInfoInterface[]> {
        // console.log("DataEmitterService.getArtistCardInfo() -> ", this.artistCardInfoList);
        return this.artistCardInfoList.asObservable();
    }

    public getAccessToken(): Observable<string> {
        // console.log("DataEmitterService.getAccessToken() ->", this.accessToken);
        return this.accessToken.asObservable();
    }

    public getUserPlaylistData(): Observable<PlaylistDataInterface[]>{
        return this.userPlaylistData.asObservable();
    }
    public getUserLikedSongs(): Observable<UserLikedSongs>{
        return this.userLikedSongs.asObservable();
    }
}
