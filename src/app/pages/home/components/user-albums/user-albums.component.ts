import { Component, OnInit } from '@angular/core';

import { UserAlbumsService } from './user-albums.service';
import { AlbumCardsInterface } from './interfaces/AlbumCardsInterface';


@Component({
    selector: 'home-user-albums',
    templateUrl: './user-albums.component.html',
    styleUrls: ['./user-albums.component.css']
})
export class UserAlbumsComponent {
    public albumCardsList: AlbumCardsInterface[] = []

    // Lista que se carga en el html
    public loadedAlbumCards: AlbumCardsInterface[] = [];

    private contador: number = 0;


    constructor(private userAlbumsService: UserAlbumsService) {
        this.userAlbumsService.albumCardsList$.subscribe((res: AlbumCardsInterface[]) => {
            this.loadedAlbumCards = res;
        });
    }


    public navigateAlbum(link: string) {
        alert(1);
    }

    public playAlbum() {
        alert(2);
    }
}
