import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';


import { ArtistCardInfoInterface } from 'src/app/pages/home/components/user-top-artists/Interfaces/ArtistCardInfoInterface';
import { accessTokenKey } from '../constants/constants';
import { TopArtistListInterface } from '../interfaces/TopArtistListInterface';
import { AlbumDataInterface } from '../interfaces/AlbumDataInterface';


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

    private accessTokenKey: string = accessTokenKey;

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
        // console.log("DataEmitterService.emitAccessToken() ->", token);
        this.accessToken.next(token);
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
}
