import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { AlbumInfoInterface } from '../interfaces/AlbumInfoInterface';
import { ArtistCardInfoInterface } from 'src/app/pages/home/components/user-top-artists/Interfaces/ArtistCardInfoInterface';
import { TopArtistListInterface } from '../interfaces/TopArtistListInterface';


@Injectable({
    providedIn: 'root'
})
export class DataEmitterService {
    public albumInfoList = new BehaviorSubject<AlbumInfoInterface[]>([]);
    public datosAlbumInfoList = this.albumInfoList.asObservable();

    public topArtistList = new BehaviorSubject<TopArtistListInterface>({ href: "", limit: 0, next: "", total: 0, items: [] });
    public datosTopArtistList = this.topArtistList.asObservable();

    // Información sobre los top artistas del usuario
    public artistCardInfoList = new BehaviorSubject<ArtistCardInfoInterface[]>([]);
    public datosArtistCardInfoList = this.artistCardInfoList.asObservable();


    // ========================
    // ========Emisores========
    // ========================

    public emitAlbumInterface(albumInfoList: AlbumInfoInterface[]) {
        console.log("DataEmitterService.emitAlbumInterface() ->", albumInfoList);
        this.albumInfoList.next(albumInfoList);
    }

    public emitTopArtistListInterface(topArtistList: TopArtistListInterface) {
        console.log("DataEmitterService.emitTopArtistListInterface() ->", topArtistList);
        this.topArtistList.next(topArtistList);
    }

    // Invocado desde MyArtistsComponent
    public emitArtistCardInfo(artistInfoList: ArtistCardInfoInterface[]) {
        this.artistCardInfoList.next(artistInfoList);
    }

    // ====================================
    // ============Suscriptores============
    // ====================================

    // Me suscribo desde ArtistListComponent
    public getArtistCardInfo(): Observable<ArtistCardInfoInterface[]> {
        console.log("DataEmitterService.getArtistCardInfo() -> ", this.artistCardInfoList);
        return this.artistCardInfoList.asObservable();
    }
}
