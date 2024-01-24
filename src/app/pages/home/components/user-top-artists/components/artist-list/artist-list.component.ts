import { Component, OnInit } from '@angular/core';

import { DataEmitterService } from 'src/app/core/services/data-emitter.service';

import { ArtistCardInfoInterface } from '../../Interfaces/ArtistCardInfoInterface';


@Component({
    selector: 'home-artist-list',
    templateUrl: './artist-list.component.html',
    styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
    public artistList: ArtistCardInfoInterface[] = []
    private dataEmitterService: DataEmitterService;


    constructor(dataEmitterService: DataEmitterService) {
        this.dataEmitterService = dataEmitterService;
    }

    ngOnInit() {
        this.getTopArtists();
    }

    /** 
     * Me suscribo al emisor de artistas de dataEmitterService para obtener los 6 primeros artistas
     * y les asigno el estilo personalizado, modificando el atributo 
     */
    public getTopArtists() {
        this.dataEmitterService.getArtistCardInfo()
        .subscribe(artists => {
            console.log("ArtistListComponent.getTopArtists() ->", artists);

            this.artistList = artists;
            this.setAlbumCardsCssProperty();
        })
    }

    /**
     * Cambio la propiedad css de cada elemento de la lista de albums.
     */
    private setAlbumCardsCssProperty(): void {
        console.log("ArtistListComponent.setAlbumCardsCssProperty() -> Asigno los estilos dinámicos a las cards de los artistas obtenidos");
        
        for (let index = 0; index < this.artistList.length; index++) {
            this.setCardCssProperty(this.artistList[index], index);
        }
    }

    /**
     * 
     */
    private setCardCssProperty(imageObject: ArtistCardInfoInterface, albumCardsIndex: number): void {
        let imgElement = new Image();
        
        imgElement.onload = () => {
            this.setCss(imgElement, albumCardsIndex);
        };
        
        // Esto es para evitar problemas con las CORS
        imgElement.crossOrigin = "Anonymous";
        imgElement.src = imageObject.img;
    }

    /**
     * Cargar un objeto HTMLImageElement, obtener el color de un píxel de la imagen
     * y asignarlo como propiedad css background-color
     */
    private setCss(imgElement: HTMLImageElement, albumCardsIndex: number): void {
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

        // Cambio la propiedad css del album del cual se está obteniendo el color
        this.artistList[albumCardsIndex].css = "background-color: rgb(" + colours + ");";
    }

    public navigateToSpotify(a: any) {
        window.location.href = a
    }

    // fin clase
}