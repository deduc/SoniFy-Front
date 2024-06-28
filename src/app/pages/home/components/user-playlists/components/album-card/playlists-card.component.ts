import { Component, Input, OnInit } from '@angular/core';

import { AlbumCardsInterface } from './interfaces/AlbumCardsInterface';
import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';


@Component({
    selector: 'user-playlists-cards',
    templateUrl: './playlists-card.component.html',
    styleUrls: ['./playlists-card.component.css']
})
export class PlaylistsCardComponent implements OnInit {
    public albumCards: AlbumCardsInterface[] = [
        { grupo: "Linkin Park Linkin Park Linkin Park", img: "https://picsum.photos/id/1021/400/400", spotifyLink: "spotifyLink1", titulo: "One More Light One More Light One More Light", css: "background-color: rgb(255,255,255);" },
        { grupo: "jon bobi ", img: "https://picsum.photos/id/1025/400/400", spotifyLink: "spotifyLink3", titulo: "its my life nigga", css: "background-color: rgb(255,255,255);" },
        { grupo: "Linkin Park ", img: "https://picsum.photos/id/1024/400/400", spotifyLink: "spotifyLink3", titulo: "One More Light", css: "background-color: rgb(255,255,255);" },
        { grupo: "gambas con fimosis", img: "https://picsum.photos/id/1041/400/400", spotifyLink: "spotifyLink3", titulo: "sexo con abuelas putas", css: "background-color: rgb(255,255,255);" },
        { grupo: "Linkin Park ", img: "https://picsum.photos/id/1033/400/400", spotifyLink: "spotifyLink3", titulo: "One More Light", css: "background-color: rgb(255,255,255);" },
    ]

    // Lista que se carga en el html
    public loadedAlbumCards: AlbumCardsInterface[] = [];

    private contador: number = 0;
    private dataEmitterService: DataEmitterService;


    constructor(dataEmitterService: DataEmitterService) {
        this.dataEmitterService = dataEmitterService;
    }

    ngOnInit() {
        setTimeout(() => {
            this.searchTopAlbums();
            this.setAlbumCardsCssProperty();
            this.loadAlbumCards(5);
        }, 200);
    }

    public navigateAlbum(link: string) {
        alert(1);
    }

    public playAlbum() {
        alert(2);
    }

    public searchTopAlbums() {
        // Me suscribo al emisor de albumes de dataEmitterService
        // this.dataEmitterService.topArtistList.subscribe();
    }

    /**
     * Cambio la propiedad css de cada elemento de la lista de albums.
     */
    private setAlbumCardsCssProperty(): void {
        for (let index = 0; index < this.albumCards.length; index++) {
            this.setCardCssProperty(this.albumCards[index], index);
        }
    }

    private setCardCssProperty(imageObject: AlbumCardsInterface, albumCardsIndex: number): void {
        let imgElement = new Image();

        // Esto es para algo de las CORS
        imgElement.crossOrigin = "Anonymous";

        imgElement.onload = () => {
            this.setCssBgColor(imgElement, albumCardsIndex);
        };

        imgElement.src = imageObject.img;
    }

    /**
     * Cargar una imagen para obtener el color de un píxel específico de esa imagen
     */
    private setCssBgColor(imgElement: HTMLImageElement, albumCardsIndex: number): string {
        let canvas: HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D;

        let pixelData: Uint8ClampedArray;
        let color: string;

        let x: number = imgElement.width / 2;
        let y: number = imgElement.width / 2;

        let colours: number[];

        canvas = document.createElement('canvas');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        ctx = canvas.getContext('2d')!;
        ctx.drawImage(imgElement, 0, 0);

        pixelData = ctx.getImageData(x, y, 1, 1).data;
        color = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;

        colours = [pixelData[0], pixelData[1], pixelData[2]]

        // console.log(colours);

        // Cambio la propiedad css del album del cual se está obteniendo el color
        this.albumCards[albumCardsIndex].css = "background-color: rgb(" + colours + ");";

        return color;
    }

    public loadAlbumCards(newIndex: number = 5) {
        this.contador += newIndex;

        // Compruebo que el usuario no se pase de listo e intente cargar más albums de los que existen.
        if (this.contador >= this.albumCards.length) {
            this.contador = this.albumCards.length
        }

        // Agrego albums a la lista de albumes que se imprimirán en el html
        for (let index = 0; index < this.contador; index++) {
            this.loadedAlbumCards[index] = this.albumCards[index]
        }
    }
}
