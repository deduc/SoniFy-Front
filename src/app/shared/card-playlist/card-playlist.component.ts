import { Component, Input } from '@angular/core';
import { PlaylistDataInterface } from 'src/app/core/interfaces/PlaylistsDataInterface';

@Component({
    selector: 'shared-card-playlists',
    templateUrl: './card-playlist.component.html',
    styleUrls: ['./card-playlist.component.css']
})
export class CardPlaylistComponent {
    @Input()
    public playlists: PlaylistDataInterface[] = [];

    constructor() { }
}
