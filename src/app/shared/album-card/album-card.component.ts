import { Component, Input, OnInit } from '@angular/core';
import { AlbumCardsInterface } from './interfaces/AlbumCardsInterface';

@Component({
  selector: 'shared-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent implements OnInit {
    @Input()
    public AlbumCards: AlbumCardsInterface[] = [
        {grupo: "grupo1", img: "https://picsum.photos/id/1020/400/400", spotifyLink: "spotifyLink1", titulo: "titulo1"},
        {grupo: "grupo2", img: "https://picsum.photos/id/1020/400/400", spotifyLink: "spotifyLink2", titulo: "titulo2"},
        {grupo: "grupo3", img: "https://picsum.photos/id/1020/400/400", spotifyLink: "spotifyLink3", titulo: "titulo3"},
    ]

    constructor() { }

    ngOnInit() {}

}
