// data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlbumInfoInterface } from '../interfaces/AlbumInfoInterface';
import { TopArtistListInterface } from '../interfaces/TopArtistListInterface';

@Injectable({
  providedIn: 'root'
})
export class DataEmitterService {
    public albumInfoList = new BehaviorSubject<AlbumInfoInterface[]>([]);
    public datosAlbumInfoList = this.albumInfoList.asObservable();

    public topArtistList = new BehaviorSubject<TopArtistListInterface>(
        {href: "", limit: 0, next: "", total: 0, items: []}
    );
    public datostopArtistList = this.topArtistList.asObservable();

    constructor() {}

    /** Invocado desde BuscadorComponent.emitAlbumList() */
    public emitAlbumInterface(albumInfoList: AlbumInfoInterface[]) {
        this.albumInfoList.next(albumInfoList);
    }

    /** Invocado desde UserTopItemsComponent.fetchUserTopItemsList() */
    public emitTopArtistListInterface(topArtistList: TopArtistListInterface) {
        this.topArtistList.next(topArtistList);
    }
}
