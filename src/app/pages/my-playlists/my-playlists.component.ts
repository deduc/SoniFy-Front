import { Component, OnInit } from '@angular/core';

import { DataEmitterService } from '../../core/global-services/data-emitter.service';

// interfaces y clases
import { PlaylistDataInterface } from '../home/components/user-playlists/interfaces/PlaylistsDataInterface';
import { UserLikedSongs } from '../home/components/user-playlists/interfaces/UserLikedSongs';


@Component({
    selector: 'pages-my-playlists',
    templateUrl: './my-playlists.component.html',
    styleUrls: ['./my-playlists.component.css']
})
export class MyPlaylistsComponent implements OnInit {
    public userPlaylistData: PlaylistDataInterface[] = [];
    public userLikedSongs: UserLikedSongs = { numberOfSongs: 0, songsObjList: [], SpotifyApiNextSongsUrl: "", SpotifyApiEndpoint: "" };

    private DataEmitterService: DataEmitterService;


    constructor(DataEmitterService: DataEmitterService) {
        this.DataEmitterService = DataEmitterService;

        this.getUserPlaylistsAndLikedSongs();
    }

    ngOnInit() { }


    private getUserPlaylistsAndLikedSongs() {
        this.DataEmitterService.getUserPlaylistData().subscribe(res => {
            this.userPlaylistData = res;
        })

        this.DataEmitterService.getUserLikedSongs().subscribe(res => {
            this.userLikedSongs = res;
        })
    }
}