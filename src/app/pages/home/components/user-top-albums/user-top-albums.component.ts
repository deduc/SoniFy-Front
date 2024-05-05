import { Component, OnInit } from '@angular/core';

import { SpotifyTopAlbums, accessTokenKey } from 'src/app/core/constants/constants';

import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';
import { UserTopAlbumsService } from './UserTopAlbums.service';


@Component({
  selector: 'home-user-top-albums',
  templateUrl: './user-top-albums.component.html',
  styleUrls: ['./user-top-albums.component.css']
})
export class UserTopAlbumsComponent implements OnInit {
    private accessToken: string = "";
    private spotifyTopAlbumsEndpoint: string;

    private dataEmitterService: DataEmitterService;
    private userTopAlbumsService: UserTopAlbumsService;


    constructor(dataEmitterService: DataEmitterService, userTopAlbumsService: UserTopAlbumsService) {
        this.dataEmitterService = dataEmitterService;
        this.userTopAlbumsService = userTopAlbumsService;
        
        this.spotifyTopAlbumsEndpoint = SpotifyTopAlbums;
                
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }

    ngOnInit() {
        setTimeout(() => {
            // console.log("UserTopAlbumsComponent.ngOnInit() -> Invoco a this.userTopAlbumsService.fetchUserTopArtistsList()");
            // this.userTopAlbumsService.fetchUserTopAlbumsList(this.spotifyTopAlbumsEndpoint, this.accessToken);
        }, 400);
    }

    // fin clase
}