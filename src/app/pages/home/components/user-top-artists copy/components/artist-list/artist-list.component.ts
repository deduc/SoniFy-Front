import { Component, OnInit } from '@angular/core';

import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';

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
     * y les asigno el estilo personalizado, modificando atributos css
     */
    public getTopArtists() {
        this.dataEmitterService.getArtistCardInfo()
        .subscribe(artists => {
            console.log("ArtistListComponent.getTopArtists() ->", artists);
            this.artistList = artists;
            
            setTimeout(() => {
                this.setArtistsListCssProperty();
            }, 100);
        })
    }

    /**
     * Recorro la lista de artistas obtenida y cambio la propiedad css de cada objeto.
     */
    private setArtistsListCssProperty(): void {
        console.log("ArtistListComponent.setArtistsListCssProperty() -> Asigno los estilos dinámicos a las cards de los artistas obtenidos");
        
        for (let index = 0; index < this.artistList.length; index++) {
            this.setArtistCssProperty(this.artistList[index], index);
        }
    }

    /**
     * Creo un elemento imagen html al que le asigno los atributos crossOrigin y source.
     * Una vez haya cargado el objeto, se activa el evento onload() y edito su propiedad css.
     */
    private setArtistCssProperty(imageObject: ArtistCardInfoInterface, artistCardsIndex: number): void {
        let imgElement: HTMLImageElement = new Image();

        // Esto es para evitar problemas con las CORS
        imgElement.crossOrigin = "Anonymous";
        imgElement.src = imageObject.img;

        imgElement.onload = () => {
            this.setCss(imgElement, artistCardsIndex);
        };
    }

    /**
     * Cargar un objeto HTMLImageElement, obtener el color de un píxel de la imagen
     * y asignarlo como propiedad css background-color
     */
    private setCss(imgElement: HTMLImageElement, artistCardsIndex: number): void {
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
        this.artistList[artistCardsIndex].css = "background-color: rgb(" + rgbColoursList + ");";
    }

    // Usuario clica en 
    public navigateToSpotifyWeb(spotifyLink: string): void {
        window.open(spotifyLink, '_blank');
    }

    // Usuario clcia en boton de play
    // todo: escuchar el top canciones del artista en cuestion
    public reproduceAudio(apiId: string | null) {


        // ! ejemplo de reproduccion de audio
        const context = new AudioContext();
        const audioSrc = '/assets/Never Gonna Give You Up.mp3';

        fetch(audioSrc)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            const source = context.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(context.destination);
            source.start();
        })
        .catch(error => console.error('Error al decodificar audio:', error));
    }

    // fin clase
}