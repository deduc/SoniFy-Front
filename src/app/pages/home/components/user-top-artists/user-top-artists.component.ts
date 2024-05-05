import { Component, OnInit } from '@angular/core';


import { UserTopArtistsService } from './user-top-artists.service';
import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';

import { SpotifyTopArtists, accessTokenKey } from 'src/app/core/constants/constants';
import { ArtistCardInfoInterface } from './Interfaces/ArtistCardInfoInterface';


@Component({
    selector: 'home-user-top-artists',
    templateUrl: './user-top-artists.component.html',
    styleUrls: ['./user-top-artists.component.css']
})
export class UserTopArtistsComponent implements OnInit {
    public artistCardInfo: ArtistCardInfoInterface[] = []

    private accessToken: string = "";
    private spotifyTopArtistsEndpoint: string = SpotifyTopArtists;
    private userTopArtistsService: UserTopArtistsService;
    private dataEmitterService: DataEmitterService;


    constructor(userTopArtistsService: UserTopArtistsService, dataEmitterService: DataEmitterService) {
        this.userTopArtistsService = userTopArtistsService;
        this.dataEmitterService = dataEmitterService
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }

    public async ngOnInit(): Promise<void> {
        this.artistCardInfo = await this.getTopArtistsFromApi();

        setTimeout(() => {
            this.setArtistsListCssProperties();
            // this.emitArtistInfoList(this.artistCardInfo);
        }, 400);
    }

    // Usuario clica en el icono para saltar a otra pagina
    public navigateToSpotifyWeb(spotifyLink: string): void {
        window.open(spotifyLink, '_blank');
    }

    // =============================================
    // ===============Métodos privados===============
    // =============================================

    private async getTopArtistsFromApi(): Promise<ArtistCardInfoInterface[]> {
        console.log("UserTopArtistsComponent.getTopArtistsFromApi() -> Invoco a this.userTopArtistsService.fetchUserTopArtistsList()");

        try {
            const artistInfoList: ArtistCardInfoInterface[] = await this.userTopArtistsService.fetchUserTopArtistsList(this.spotifyTopArtistsEndpoint, this.accessToken);
            return artistInfoList;
        }
        catch (error) {
            console.error("Error al obtener la lista de artistas:", error);

            // En caso de error, devolvemos una lista vacía
            return [];
        }
    }

    private emitArtistInfoList(artistInfoList: ArtistCardInfoInterface[]) {
        this.dataEmitterService.emitArtistCardInfo(artistInfoList);
    }


    /**
     * Recorro la lista de artistas obtenida y cambio la propiedad css de cada objeto.
     */
    private setArtistsListCssProperties(): void {
        console.log("ArtistListComponent.setArtistsListCssProperties() -> Asigno los estilos dinámicos a las cards de los artistas obtenidos");

        for (let index = 0; index < this.artistCardInfo.length; index++) {
            this.setArtistCssProperty(this.artistCardInfo[index], index);
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
        this.artistCardInfo[artistCardsIndex].css = "background-color: rgb(" + rgbColoursList + ");";
    }


    // Usuario clcia en boton de play
    // todo: escuchar el top canciones del artista en cuestion
    private reproduceAudio(apiId: string | null) {


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

}
