/// <reference types="spotify-web-playback-sdk" />

interface Window {
    onSpotifyWebPlaybackSDKReady: (() => any);
    Spotify: typeof Spotify;
}
