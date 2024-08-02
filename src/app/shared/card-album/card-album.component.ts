import { Component, Input } from '@angular/core';
import { AlbumDataInterface } from 'src/app/core/interfaces/AlbumDataInterface';

@Component({
    selector: 'shared-card-albums',
    templateUrl: './card-album.component.html',
    styleUrls: ['./card-album.component.css']
})
export class CardAlbumComponent {
    @Input()
    public albums: AlbumDataInterface[] = [];

    constructor() { }
}
