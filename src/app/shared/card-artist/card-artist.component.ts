import { Component, Input, OnInit } from '@angular/core';
import { ArtistInterface } from 'src/app/core/interfaces/ArtistsInterface';
import { ArtistCardInfoInterface } from 'src/app/pages/home/components/user-top-artists/Interfaces/ArtistCardInfoInterface';

@Component({
    selector: 'shared-card-artist',
    templateUrl: './card-artist.component.html',
    styleUrls: ['./card-artist.component.css']
})
export class CardArtistComponent implements OnInit {
    @Input()
    public artist: ArtistInterface;
    public artistCardInfo: ArtistCardInfoInterface;


    constructor() {
        this.artist = {
            external_url: "", genres: [], id: "", image_url: "", name: ""
        }

        this.artistCardInfo = {
            name: "", img: "", spotify_url: "", apiId: "", css: "",
        }

    }

    ngOnInit(): void {
        this.artistCardInfo = {
            name: this.artist.name,
            img: this.artist.image_url,
            spotify_url: this.artist.external_url,
            apiId: this.artist.id,
            css: "",
        }

        this.setArtistsListCssProperties();
    }


    // Usuario clica en el icono para saltar a otra pagina
    public navigateToSpotifyWeb(spotifyLink: string): void {
        window.open(spotifyLink, '_blank');
    }

    // * metodos privados
    // * metodos privados
    // * metodos privados

    /**
     * Recorro la lista de artistas obtenida y cambio la propiedad css de cada objeto.
     */
    private setArtistsListCssProperties(): void {
        this.setArtistCssProperty(this.artistCardInfo);
    }

    /**
     * Creo un elemento imagen html al que le asigno los atributos crossOrigin y source.
     * Una vez haya cargado el objeto, se activa el evento onload() y edito su propiedad css.
     */
    private setArtistCssProperty(imageObject: ArtistCardInfoInterface): void {
        let imgElement: HTMLImageElement = new Image();

        // Esto es para evitar problemas con las CORS
        imgElement.crossOrigin = "Anonymous";
        imgElement.src = imageObject.img;

        imgElement.onload = () => {
            this.setCss(imgElement);
        };
    }

    /**
     * Cargar un objeto HTMLImageElement, obtener el color de un píxel de la imagen
     * y asignarlo como propiedad css background-color
     */
    private setCss(imgElement: HTMLImageElement): void {
        // Obtengo las coordenadas (x,y) que suponen el centro de la imagen
        let x: number = imgElement.width / 2;
        let y: number = imgElement.width / 2;

        // Creo un objeto <canvas> con las dimensiones de la imagen obtenida
        let canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        // Creo el objeto canvas a partir del objeto HTMLImageElement y le hago dibujar la imagen 
        // y que las coordenadas de inicio del dibujado de la foto empiecen en (0,0)
        let ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
        ctx.drawImage(imgElement, 0, 0);

        // Obtengo los colores rgb del pixel (x,y) y dimensiones (1,1)
        let pixelColoursData: Uint8ClampedArray = ctx.getImageData(x, y, 1, 1).data;

        let rgbColoursList: number[] = [pixelColoursData[0], pixelColoursData[1], pixelColoursData[2]]

        // Cambio la propiedad css del album del cual se está obteniendo el color
        this.artistCardInfo.css = "background-color: rgb(" + rgbColoursList + ");";
    }
}
