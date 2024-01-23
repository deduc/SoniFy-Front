import { Component, OnInit } from '@angular/core';


import { SpotifyTopArtists, accessTokenKey } from 'src/app/core/constants/constants';
import { UserTopArtistsService } from './user-top-artists.service';
import { ArtistCardInfoInterface } from './Interfaces/ArtistCardInfoInterface';
import { DataEmitterService } from 'src/app/core/services/data-emitter.service';


@Component({
  selector: 'home-user-top-artists',
  templateUrl: './user-top-artists.component.html',
  styleUrls: ['./user-top-artists.component.css']
})
export class UserTopArtistsComponent implements OnInit {
    public artistCardInfoInterface: ArtistCardInfoInterface[] = []

    private accessToken: string = "";
    private spotifyTopArtistsEndpoint: string;
    private userTopArtistsService: UserTopArtistsService;
    private dataEmitterService: DataEmitterService;


    constructor(userTopArtistsService: UserTopArtistsService, dataEmitterService: DataEmitterService) {
        this.userTopArtistsService = userTopArtistsService;
        this.dataEmitterService = dataEmitterService
        
        this.spotifyTopArtistsEndpoint = SpotifyTopArtists;
                
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }

    ngOnInit() {
        this.getTopArtists();
        
        setTimeout(() => {
            this.emitArtistInfoList(this.artistCardInfoInterface);
        }, 200);
    }

    private getTopArtists() {
        console.log("UserTopArtistsComponent.getTopArtists() -> Invoco a this.userTopArtistsService.fetchUserTopArtistsList()");
        let artistInfoList: Promise<ArtistCardInfoInterface[]> = this.userTopArtistsService.fetchUserTopArtistsList(this.spotifyTopArtistsEndpoint, this.accessToken);
        artistInfoList.then(res => this.artistCardInfoInterface = res);
    }

    private emitArtistInfoList(artistInfoList: ArtistCardInfoInterface[]){
        this.dataEmitterService.emitArtistCardInfo(artistInfoList);
    }
}
