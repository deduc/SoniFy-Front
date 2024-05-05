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

    async ngOnInit(): Promise<void> {
        this.artistCardInfo = await this.getTopArtists();
        
        setTimeout(() => {
            this.emitArtistInfoList(this.artistCardInfo);
        }, 400);
    }

    private async getTopArtists(): Promise<ArtistCardInfoInterface[]> {
        console.log("UserTopArtistsComponent.getTopArtists() -> Invoco a this.userTopArtistsService.fetchUserTopArtistsList()");
            
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

    private emitArtistInfoList(artistInfoList: ArtistCardInfoInterface[]){
        this.dataEmitterService.emitArtistCardInfo(artistInfoList);
    }
}
