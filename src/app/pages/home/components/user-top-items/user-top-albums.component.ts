import { Component, OnInit } from '@angular/core';

import { SpotifyTopArtists, accessTokenKey } from 'src/app/core/constants/constants';

import { AlbumInfoInterface } from 'src/app/core/interfaces/AlbumInfoInterface';

import { DataEmitterService } from 'src/app/core/services/data-emitter.service';
import { UserTopAlbumsService } from './user-top-albums.service';


@Component({
  selector: 'home-user-top-albums',
  templateUrl: './user-top-albums.component.html',
  styleUrls: ['./user-top-albums.component.css']
})
export class UserTopAlbumsComponent implements OnInit {
    private accessToken: string = "";
    private spotifyTopArtistsEndpoint: string;

    private dataEmitterService: DataEmitterService;
    private userTopAlbumsService: UserTopAlbumsService;


    constructor(dataEmitterService: DataEmitterService, userTopAlbumsService: UserTopAlbumsService) {
        this.dataEmitterService = dataEmitterService;
        this.userTopAlbumsService = userTopAlbumsService;
        
        this.spotifyTopArtistsEndpoint = SpotifyTopArtists;
                
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }

    ngOnInit() {
        this.userTopAlbumsService.fetchUserTopArtistsList(this.spotifyTopArtistsEndpoint, this.accessToken);
    }

    // fin clase
}