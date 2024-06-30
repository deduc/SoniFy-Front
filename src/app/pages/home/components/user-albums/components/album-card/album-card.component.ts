import { Component, Input, OnInit } from '@angular/core';

import { AlbumCardsInterface } from './interfaces/AlbumCardsInterface';
import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';



@Component({
    selector: 'home-album-cards',
    templateUrl: './album-card.component.html',
    styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent implements OnInit {
    @Input()
    public playlistCards: AlbumCardsInterface[] = []

    // Lista que se carga en el html
    public loadedAlbumCards: AlbumCardsInterface[] = [];

    private contador: number = 0;
    private dataEmitterService: DataEmitterService;


    constructor(dataEmitterService: DataEmitterService) {
        this.dataEmitterService = dataEmitterService;
    }

    ngOnInit() {
        setTimeout(() => {
            this.doGetUserAlbums();
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

    public doGetUserAlbums() {
        // todo
        // Me suscribo al emisor de albumes de dataEmitterService
        // this.dataEmitterService.topArtistList.subscribe();
    }

    /**
     * Cambio la propiedad css de cada elemento de la lista de albums.
     */
    private setAlbumCardsCssProperty(): void {
        for (let index = 0; index < this.playlistCards.length; index++) {
            this.setCardCssProperty(this.playlistCards[index], index);
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
        this.playlistCards[albumCardsIndex].css = "background-color: rgb(" + colours + ");";

        return color;
    }

    public loadAlbumCards(newIndex: number = 5) {
        this.contador += newIndex;

        // Compruebo que el usuario no se pase de listo e intente cargar más albums de los que existen.
        if (this.contador >= this.playlistCards.length) {
            this.contador = this.playlistCards.length
        }

        // Agrego albums a la lista de albumes que se imprimirán en el html
        for (let index = 0; index < this.contador; index++) {
            this.loadedAlbumCards[index] = this.playlistCards[index]
        }
    }
}
