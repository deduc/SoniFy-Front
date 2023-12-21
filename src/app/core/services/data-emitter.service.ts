// data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlbumInfoInterface } from '../interfaces/AlbumInfoInterface';

@Injectable({
  providedIn: 'root'
})
export class DataEmitterService {
    private albumInfo = new BehaviorSubject<AlbumInfoInterface[]>([]);
    datosActuales = this.albumInfo.asObservable();

    constructor(){}

    emitAlbumInterface(albumInfoList: AlbumInfoInterface[]) {
        this.albumInfo.next(albumInfoList);
    }
}
