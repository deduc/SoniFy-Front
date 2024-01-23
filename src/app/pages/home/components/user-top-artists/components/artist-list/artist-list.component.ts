import { Component, OnInit } from '@angular/core';
import { DataEmitterService } from 'src/app/core/services/data-emitter.service';
import { AlbumCardsInterface } from 'src/app/shared/album-card/interfaces/AlbumCardsInterface';
import { ArtistCardInfoInterface } from '../../Interfaces/ArtistCardInfoInterface';

@Component({
  selector: 'home-user-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
    public artistList: ArtistCardInfoInterface[] = [
        {name: "", img: "", spotify_url: "", css: "background-color: rgb(255,255,255);"},
        {name: "", img: "", spotify_url: "", css: "background-color: rgb(255,255,255);"},
        {name: "", img: "", spotify_url: "", css: "background-color: rgb(255,255,255);"},
        {name: "", img: "", spotify_url: "", css: "background-color: rgb(255,255,255);"},
        {name: "", img: "", spotify_url: "", css: "background-color: rgb(255,255,255);"},
        {name: "", img: "", spotify_url: "", css: "background-color: rgb(255,255,255);"},
    ]

    private dataEmitterService: DataEmitterService;

    constructor(dataEmitterService: DataEmitterService) {
        this.dataEmitterService = dataEmitterService;
    }

    ngOnInit() {
        this.getTopArtists();
        setTimeout(() => {
            this.setAlbumCardsCssProperty();
        }, 200);
    }

    public getTopArtists() {
        // Me suscribo al emisor de artistas de dataEmitterService
        this.dataEmitterService.getArtistCardInfo().subscribe(info => this.artistList = info)
    }

    /**
     * Cambio la propiedad css de cada elemento de la lista de albums.
     */
    private setAlbumCardsCssProperty(): void {
        for (let index = 0; index < this.artistList.length; index++) {
            this.setCardCssProperty(this.artistList[index], index);
        }
    }

    private setCardCssProperty(imageObject: ArtistCardInfoInterface, albumCardsIndex: number): void {
        let imgElement = new Image();
        
        // Esto es para algo de las CORS
        imgElement.crossOrigin = "Anonymous";
    
        imgElement.onload = () => {
            this.setCss(imgElement, albumCardsIndex);
        };
        
        imgElement.src = imageObject.img;
    }

    /**
     * Cargar una imagen para obtener el color de un píxel específico de esa imagen
     */
    private setCss(imgElement: HTMLImageElement, albumCardsIndex: number): string {
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
        this.artistList[albumCardsIndex].css = "background-color: rgb(" + colours + ");";
    
        return color;
    }

}
