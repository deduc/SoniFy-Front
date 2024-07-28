import { Component, Input } from '@angular/core';
import { TrackInfoInterface } from 'src/app/core/interfaces/TrackInfoInterface';

@Component({
    selector: 'shared-card-track',
    templateUrl: './card-track.component.html',
    styleUrls: ['./card-track.component.css']
})
export class CardTrackComponent {
    @Input()
    public track: TrackInfoInterface;

    constructor() {
        this.track = {
            apiHref: "", externalUrl: "", group: "", time: "", tittle: "", idTrack: "", imgUrl: "", uri: "", popularity: ""
        }
    }
}
