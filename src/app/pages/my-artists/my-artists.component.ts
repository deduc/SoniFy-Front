import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ArtistCardInfoInterface } from '../home/components/user-top-artists/Interfaces/ArtistCardInfoInterface';
import { SpotifyTopArtists, accessTokenKey } from 'src/app/core/constants/constants';


@Component({
    selector: 'app-my-artists',
    templateUrl: './my-artists.component.html',
    styleUrls: ['./my-artists.component.css']
})
export class MyArtistsComponent {
    public artistCardList: ArtistCardInfoInterface[] = [];

    public nextArtistsUrl: string = "";
    private SpotifyTopArtistsUrl: string = SpotifyTopArtists;

    private httpClient: HttpClient;
    private accessToken: string;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }

    async ngOnInit(): Promise<void> {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.artistCardList = await this.fetchUserTopArtistsList(this.SpotifyTopArtistsUrl, this.accessToken);
    }

    /**
     * Hago petición a la api para obtener información sobre los top artistas de spotify del usuario.
     */
    public async fetchUserTopArtistsList(apiUrl: string, token: string): Promise<ArtistCardInfoInterface[]> {
        const headers = new HttpHeaders({ "Authorization": "Bearer " + token });
        let artistInfoList: ArtistCardInfoInterface[] = [];
        let artistInfoAux: ArtistCardInfoInterface;

        // Añado a la url el parámetro limit=6 para obtener como máximo 6 artistas tras hacer la petición a la api
        // apiUrl = apiUrl + `?limit=6`;

        // Peticion api para obtener informacion sobre los artistas
        this.httpClient.get(apiUrl, { headers: headers })
            .subscribe(response => {
                let data: any = response;

                // console.log("UserTopArtistsService.fetchUserTopArtistsList() ->", data);
                this.nextArtistsUrl = data.next;

                // Creo los objetos ArtistCardInfoInterface y los añado a la lista
                for (let index = 0; index < data.items.length; index++) {
                    artistInfoAux = {
                        name: data.items[index].name,
                        img: data.items[index].images[0].url,
                        spotify_url: data.items[index].external_urls.spotify,
                        apiId: data.items[index].id,
                        // css: "background-color: red"
                        css: ""
                    };

                    artistInfoList.push(artistInfoAux);
                }
            });

        setTimeout(() => {
            this.setArtistsListCssProperties();
        }, 400);

        return await artistInfoList;
    }

    // Evento que se ejecuta cuando el usuario clica en "ver más artistas"
    public async getMoreArtists(): Promise<void> {
        const newData: ArtistCardInfoInterface[] = await this.fetchUserTopArtistsList(this.nextArtistsUrl, this.accessToken);

        await new Promise(resolve => setTimeout(resolve, 200));

        console.log(newData);

        for (let index = 0; index < newData.length; index++) {
            const element = newData[index];
            this.artistCardList.push(element);
        }
    }


    /**
     * Recorro la lista de artistas obtenida y cambio la propiedad css de cada objeto.
     */
    private setArtistsListCssProperties(): void {
        console.log("ArtistListComponent.setArtistsListCssProperties() -> Asigno los estilos dinámicos a las cards de los artistas obtenidos");

        for (let index = 0; index < this.artistCardList.length; index++) {
            this.setArtistCssProperty(this.artistCardList[index], index);
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
        this.artistCardList[artistCardsIndex].css = "background-color: rgb(" + rgbColoursList + ");";
    }

}
