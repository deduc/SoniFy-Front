// src/app/shared/audio-reproducer-bar/audio-reproducer-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { accessTokenKey, spotifySdkPlayerName } from '../../core/constants/constants';
import { SpotifySdkWebPlayerService } from 'src/app/core/global-services/spotify-sdk-web-player.service';
import { MediaPlayerDevice } from './interfaces/MediaPlayerDevice.interface';


@Component({
    selector: 'shared-audio-reproducer-bar',
    templateUrl: './audio-reproducer-bar.component.html',
    styleUrls: ['./audio-reproducer-bar.component.css']
})
export class AudioReproducerBarComponent implements OnInit {
    public idDevice: string = "";
    public mediaPlayerDevices: MediaPlayerDevice[] = [];
    public spotifySdkPlayerName: string = spotifySdkPlayerName;
    public trackUri: string = "";
    
    private spotifyService: SpotifySdkWebPlayerService;
    private sonifyMediaName: string = spotifySdkPlayerName;
    private lastPlayedTrackUri: string = "";

    constructor(spotifyService: SpotifySdkWebPlayerService) {
        this.spotifyService = spotifyService;
        
        setTimeout(async () => {
            this.loadMediaPlayerDevices();
            this.lastPlayedTrackUri = await this.spotifyService.getLastPlayedTrack();
        }, 2000);
    }

    ngOnInit(): void { }

    onDeviceChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        // resto 1 para evitar seleccionar la opción "Selecciona un dispositivo"
        const selectedIndex = selectElement.selectedIndex - 1;

        if (selectedIndex >= 0) {
            const selectedItem: MediaPlayerDevice = this.mediaPlayerDevices[selectedIndex];
            this.idDevice = selectedItem.id;
        }
    }

    public play(): void {
        let id: string = this.idDevice;

        if (id != null) {
            this.spotifyService.playOnThisDevice(this.trackUri, id);
        }
        else if (this.idDevice != null) {
            this.spotifyService.playOnThisDevice(this.trackUri, this.idDevice);
        }
        else {
            console.error("ERROR: No se ha podido obtener el ID del reproductor de sonido.");
        }

        this.spotifyService.play();
    }

    public pause(): void {
        this.spotifyService.pause();
    }

    public nextTrack(): void {
        this.spotifyService.nextTrack();
    }

    public previousTrack(): void {
        this.spotifyService.previousTrack();
    }

    // * privados
    // * privados
    // * privados

    private loadMediaPlayerDevices(): void {
        this.spotifyService.mediaPlayerDevices$.subscribe(
            (apiRes: any) => {
                let mediaPlayersAux: MediaPlayerDevice[] = apiRes;
                this.mediaPlayerDevices = mediaPlayersAux;
            }
        )
    }
}
