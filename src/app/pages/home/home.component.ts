import { Component, OnInit } from '@angular/core';

import { DataEmitterService } from 'src/app/core/services/data-emitter.service';
import { AlbumInfoInterface } from 'src/app/core/interfaces/AlbumInfoInterface';
import { HomeService } from './home.service';


@Component({
    selector: 'pages-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    /** Info sobre los albumes que ha buscado el usuario en buscador.component*/
    public albumInfoList: AlbumInfoInterface[] = [{
        album_type: "",
        api_href: "",
        api_id: "",
        artist: "",
        img_url: "",
        name: "",
        release_date: "",
        spotify_url: "",
        total_tracks: "",
    }];
    
    private dataEmitterService: DataEmitterService;
    private homeService: HomeService;

    constructor(dataEmitterService: DataEmitterService, homeService: HomeService) {
        this.dataEmitterService = dataEmitterService;
        this.homeService = homeService;
    }

    async ngOnInit(): Promise<void> {
        await this.homeService.getAccessToken();
        
        // Me suscribo al emisor de albumes de dataEmitterService
        this.dataEmitterService.datosAlbumInfoList.subscribe(datos => this.albumInfoList = datos);

        // await fetchProfile(localStorage.getItem(accessTokenKey)!);

        // todo para refrescar el access token cuando expire: https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
        // todo intentar obtenre datos personales, pregunta a quien quieras yks
    }

    // ! Este método quizá no deba estar aqui
    private async fetchProfile(token: string): Promise<any> {
        console.log("token", token);
        
        try {
          const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          });
      
          if (!result.ok) {
            throw new Error(`Error: ${result.status} - ${result.statusText}`);
          }
      
          const data = await result.json();
          console.log(data);
          return data;
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
          throw error; // Puedes lanzar el error nuevamente para que sea manejado por el código que llama a esta función.
        }
    }
}
