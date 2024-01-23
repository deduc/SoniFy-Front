/** Objeto que contiene algunos de los datos necesarios para obtener un access_token de Spotify */
export interface SpotifyAppDataInterface {
    clientId: string,
    clientSecret: string,
    codeFromUrl: string,
    redirectUri: string,
}