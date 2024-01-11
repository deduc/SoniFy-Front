// data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlbumInfoInterface } from '../interfaces/AlbumInfoInterface';

@Injectable({
  providedIn: 'root'
})
export class DataEmitterService {
    public albumInfoList = new BehaviorSubject<AlbumInfoInterface[]>([]);
    public datosAlbumInfoList = this.albumInfoList.asObservable();

    constructor(){}

    /** Invocado desde BuscadorComponent */
    public emitAlbumInterface(albumInfoList: AlbumInfoInterface[]) {
        this.albumInfoList.next(albumInfoList);
    }
}
