import { Injectable } from "@angular/core";

import { accessTokenKey, SpotifyPlayerDevices, spotifySdkPlayerName } from "../constants/constants";
import { BehaviorSubject } from "rxjs";
import { MediaPlayerDevice } from "src/app/shared/audio-reproducer-bar/interfaces/MediaPlayerDevice.interface";
import { HttpClient } from "@angular/common/http";
import { HttpHeadersSoniFy } from "../interfaces/HttpHeadersSoniFy.interface";


@Injectable({
    providedIn: "root",
})
export class SpotifySdkWebPlayerService {
    public mediaPlayerDevicesSubject = new BehaviorSubject<MediaPlayerDevice[]>([]);
    public mediaPlayerDevices$ = this.mediaPlayerDevicesSubject.asObservable();

    private angularSpotifyPlayerName: string = spotifySdkPlayerName;
    public accessToken: string = localStorage.getItem(accessTokenKey)!;
    private httpClient: HttpClient;
    private httpHeaders: HttpHeadersSoniFy;
    private spotifyMediaPlayer: Spotify.Player | null = null;
    private spotifyPlayerDevices: string = SpotifyPlayerDevices;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
        this.httpHeaders = {
            method: "GET",
            headers: { "Authorization": `Bearer ${this.accessToken}` }
        }

        this.waitForSpotifySDK().then(() => {
            this.initializePlayer();
        });
    }

    public getAvailableDevices(headers: any): void {
        this.httpClient.get(this.spotifyPlayerDevices, headers).subscribe(
            (apiRes: any) => {
                console.log("SpotifySdkWebPlayerService.getAvailableDevices() ->", apiRes);

                this.doHandleSpotifyPlayerDevices(apiRes);
            }
        );
    }

    public getLastPlayedTrack(): Promise<string> {
        return fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("getLastPlayedTracks() ->", data);

                const lastTrackUri = data.items[0]?.track.uri;
                return lastTrackUri;
            })
            .catch(error => {
                console.error('Error al obtener la última canción reproducida:', error);
                throw error;
            });
    }


    public nextTrack() {
        this.spotifyMediaPlayer!.nextTrack()
            .then(() => {
                console.log("Se ha pasado a la siguiente música.");
            })
            .catch((err) => {
                console.error("ERROR: No se puede pasar a la siguiente música.", err);
            });
    }

    public pause() {
        this.spotifyMediaPlayer!.pause()
            .then(() => {
                console.log("Se ha pausado el reproductor.");
            })
            .catch((err) => {
                console.error("ERROR: No se ha podido pausar el reproductor.", err);
            });
    }

    public play() {
        this.spotifyMediaPlayer!.resume()
            .then(() => {
                console.log("Continuar reproduciendo música.");
            })
            .catch((err) => {
                console.error("ERROR: No se puede continuar reproduciendo música.", err);
            });
    }

    // todo
    public playOnThisDevice(trackUri: string, idDevice: string): void {
        const accessToken = this.accessToken;
        const url: string = `https://api.spotify.com/v1/me/player/play?device_id=${idDevice}`;
        let prueba: string = "spotify:track:7wgxq27uOvfydLunYkcmAU"
        const httpHeaders = {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
                "context_uri": trackUri,
                "offset": {
                    "position": 5
                },
                "position_ms": 0
            })
        };

        fetch(url, httpHeaders)
    }

    public previousTrack() {
        this.spotifyMediaPlayer!.previousTrack()
            .then(() => {
                console.log("Se ha pasado a la anterior música.");
            })
            .catch((err) => {
                console.error("ERROR: No se puede pasar a la anterior música.", err);
            });
    }

    public setPlayerDevice(mediaPlayerDevice: MediaPlayerDevice) { }

    // * privados
    // * privados
    // * privados
    // * privados

    private doHandleSpotifyPlayerDevices(apiRes: any): void {
        let mediaPlayerDeviceList: MediaPlayerDevice[] = [];
        let mediaPlayerDeviceAux: MediaPlayerDevice;

        apiRes.devices.forEach((mediaPlayer: any) => {
            mediaPlayerDeviceAux = {
                id: mediaPlayer.id,
                is_active: mediaPlayer.is_active,
                is_private_session: mediaPlayer.is_private_session,
                is_restricted: mediaPlayer.is_restricted,
                name: mediaPlayer.name,
                supports_volume: mediaPlayer.supports_volume,
                type: mediaPlayer.type,
                volume_percent: mediaPlayer.volume_percent
            };

            mediaPlayerDeviceList.push(mediaPlayerDeviceAux);
        });

        this.mediaPlayerDevicesSubject.next(mediaPlayerDeviceList);
    }

    private initializePlayer() {
        this.spotifyMediaPlayer = new Spotify.Player({
            name: this.angularSpotifyPlayerName,
            getOAuthToken: (cb) => { cb(this.accessToken); },
        });

        this.spotifyMediaPlayer.addListener("ready", ({ device_id }) => {
            console.log("El reproductor de música " + this.angularSpotifyPlayerName + " está listo para reproducir música.", device_id);
            // localStorage.setItem(this.sonifyMediaPlayerIdKey, device_id);
            this.getAvailableDevices(this.httpHeaders);
        });

        this.spotifyMediaPlayer.addListener("not_ready", ({ device_id }) => {
            console.log("El reproductor de música no está listo para reproducir música.", device_id);
        });

        this.spotifyMediaPlayer.connect();
    }

    private waitForSpotifySDK(): Promise<void> {
        return new Promise((resolve) => {
            if (window.Spotify) {
                resolve();
            }
            else {
                window.onSpotifyWebPlaybackSDKReady = () => {
                    resolve();
                };
            }
        });
    }
}