import { Component, OnInit } from '@angular/core';
import { AlbumCardsInterface } from './components/album-card/interfaces/AlbumCardsInterface';

@Component({
    selector: 'home-user-albums',
    templateUrl: './user-albums.component.html',
    styleUrls: ['./user-albums.component.css']
})
export class UserAlbumsComponent implements OnInit {
    public playlistCards: AlbumCardsInterface[] = []

    constructor() { }

    ngOnInit() {}

}
