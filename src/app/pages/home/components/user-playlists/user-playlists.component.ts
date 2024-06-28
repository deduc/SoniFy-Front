import { Component, OnInit } from '@angular/core';

import { SpotifyUserPlaylists, accessTokenKey } from 'src/app/core/constants/constants';

import { UserPlaylistsService } from './user-playlists.service';
import { PlaylistDataInterface } from 'src/app/core/interfaces/PlaylistDataInterface';


@Component({
    selector: 'home-user-playlists',
    templateUrl: './user-playlists.component.html',
    styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {
    public userPlaylists: PlaylistDataInterface[] = [];

    private accessToken: string = "";
    private accessTokenKey: string = accessTokenKey;
    private spotifyUserAlbumsEndpoint: string = SpotifyUserPlaylists;;
    private userPlaylistsService: UserPlaylistsService;


    constructor(userPlaylistsService: UserPlaylistsService) {
        this.userPlaylistsService = userPlaylistsService;
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }

    ngOnInit() {
        this.loadAccessTokenFromLocalStorage(this.accessTokenKey);
        this.getUserPlaylists(this.spotifyUserAlbumsEndpoint, this.accessToken);
    }

    private getUserPlaylists(userAlbumsEndpoint: string, token: string): void {
        this.userPlaylistsService.getUserPlaylists(userAlbumsEndpoint, token)
            .subscribe((res: any) => {
                console.log(11111, res);

            });
    }

    private loadAccessTokenFromLocalStorage(accessTokenKey: string): void {
        this.accessToken = localStorage.getItem(accessTokenKey)!;
    }
}
