import { Component, OnInit } from '@angular/core';
import { SpotifyTopArtists, accessTokenKey } from 'src/app/core/constants/constants';

import { AlbumInfoInterface } from 'src/app/core/interfaces/AlbumInfoInterface';
import { DataEmitterService } from 'src/app/core/services/data-emitter.service';

@Component({
  selector: 'home-user-top-items',
  templateUrl: './user-top-items.component.html',
  styleUrls: ['./user-top-items.component.css']
})
export class UserTopItemsComponent implements OnInit {
    /** Info sobre los albumes que ha buscado el usuario en buscador.component*/
    public albumInfoList: AlbumInfoInterface[] = [{
        album_type: "null_value",
        api_href: "null_value",
        api_id: "null_value",
        artist: "null_value",
        img_url: "null_value",
        name: "null_value",
        release_date: "null_value",
        spotify_url: "null_value",
        total_tracks: "null_value",
    }];

    private accessToken: string = "";
    private spotifyTopArtistsEndpoint: string;

    private dataEmitterService: DataEmitterService;


    constructor(dataEmitterService: DataEmitterService) {
        this.dataEmitterService = dataEmitterService;
        this.spotifyTopArtistsEndpoint = SpotifyTopArtists;
        
        this.accessToken = localStorage.getItem(accessTokenKey)!;
        this.fetchUserTopItemsList(this.spotifyTopArtistsEndpoint, this.accessToken);
    }

    ngOnInit() {
        // Me suscribo al emisor de albumes de dataEmitterService
        this.dataEmitterService.datosAlbumInfoList.subscribe(datos => this.albumInfoList = datos);
    }

    private async fetchUserTopItemsList(endpoint: string, token: string): Promise<any> {
        try {
            const result = await fetch(endpoint, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
        
            if (!result.ok) {
                throw new Error(`Error: ${result.status} - ${result.statusText}`);
            }
        
            const data = await result.json();
            console.log("user top items list", data);
            
            return data;
        } 
        catch (error) {
            console.error('Error al realizar la solicitud:', error);
            throw error; // Puedes lanzar el error nuevamente para que sea manejado por el código que llama a esta función.
        }

        // fin metodo
    }

    // fin clase
}
