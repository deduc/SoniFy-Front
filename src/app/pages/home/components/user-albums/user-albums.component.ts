import { Component, OnInit } from '@angular/core';

import { UserAlbumsService } from './user-albums.service';
import { AlbumCardsInterface } from './interfaces/AlbumCardsInterface';


@Component({
    selector: 'home-user-albums',
    templateUrl: './user-albums.component.html',
    styleUrls: ['./user-albums.component.css']
})
export class UserAlbumsComponent implements OnInit {
    public albumCardsList: AlbumCardsInterface[] = []

    // Lista que se carga en el html
    public loadedAlbumCards: AlbumCardsInterface[] = [];

    private contador: number = 0;


    constructor(private userAlbumsService: UserAlbumsService) {
        this.userAlbumsService.albumCardsList$.subscribe((res: AlbumCardsInterface[]) => {
            this.setAlbumCardsCssProperty(res)
            this.loadedAlbumCards = res;
        });
    }

    ngOnInit() {}

    public navigateAlbum(link: string) {
        alert(1);
    }

    public playAlbum() {
        alert(2);
    }

    /**
     * Cambio la propiedad css de cada elemento de la lista de albums.
     */
    private setAlbumCardsCssProperty(albumCardsList: AlbumCardsInterface[]): void {
        for (let index = 0; index < albumCardsList.length; index++) {
            this.setCardCssProperty(albumCardsList[index], index);
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
        this.albumCardsList[albumCardsIndex].css = "background-color: rgb(" + colours + ");";

        return color;
    }

    public loadAlbumCards(newIndex: number = 5) {
        this.contador += newIndex;

        // Compruebo que el usuario no se pase de listo e intente cargar más albums de los que existen.
        if (this.contador >= this.albumCardsList.length) {
            this.contador = this.albumCardsList.length
        }

        // Agrego albums a la lista de albumes que se imprimirán en el html
        for (let index = 0; index < this.contador; index++) {
            this.loadedAlbumCards[index] = this.albumCardsList[index]
        }
    }
}
