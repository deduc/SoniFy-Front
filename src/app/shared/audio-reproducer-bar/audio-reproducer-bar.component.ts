// src/app/shared/audio-reproducer-bar/audio-reproducer-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { accessTokenKey } from '../../core/constants/constants';


@Component({
    selector: 'shared-audio-reproducer-bar',
    templateUrl: './audio-reproducer-bar.component.html',
    styleUrls: ['./audio-reproducer-bar.component.css']
})
export class AudioReproducerBarComponent implements OnInit {
    ngOnInit(): void {}

    play(){}
    pause(){}
}
// export class AudioReproducerBarComponent implements OnInit {
//     public player: Spotify.Player | any;
//     public accessToken: string;
//     private accessTokenKey: string = accessTokenKey;

//     constructor() {
//         this.accessToken = localStorage.getItem(this.accessTokenKey)!;
//     }

//     ngOnInit() {
//         this.loadSpotifySDK();
//     }

//     loadSpotifySDK() {
//         const script = document.createElement('script');
//         script.src = 'https://sdk.scdn.co/spotify-player.js';
//         document.body.appendChild(script);
//         script.onload = () => this.initializeSpotifyPlayer();
//     }

//     initializeSpotifyPlayer() {
//         console.log(this.player.connect());


//         this.player = new Spotify.Player({
//             name: 'Web Playback SDK Quick Start Player',
//             getOAuthToken: (cb: (token: string) => void) => { cb(this.accessToken!); },
//             volume: 1
//         });

//         this.player.connect();

//         // Ready
//         this.player.addListener('ready', ({ device_id }: { device_id: string }) => {
//             console.log('Ready with Device ID', device_id);
//         });

//         // Not Ready
//         this.player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
//             console.log('Device ID has gone offline', device_id);
//         });
//     }

//     play() {
//         if (this.player) {
//             this.player.resume().then(() => {
//                 console.log('Playback resumed');
//             });
//         }
//         else {
//             console.error("No existe this.player")
//         }
//     }

//     pause() {
//         if (this.player) {
//             this.player.pause().then(() => {
//                 console.log('Playback paused');
//             });
//         }
//         else {
//             console.error("No existe this.player")
//         }
//     }
// }
