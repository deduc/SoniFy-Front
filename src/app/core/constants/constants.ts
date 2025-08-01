//* API base elements
// ! Desarrollo
// export const ApiBaseUrl: string = "https://localhost"
// ! Pre-produccion (contenedor Docker). Falta certificado SSL para usar https. Solo es válido http
export const ApiBaseUrl: string = "http://localhost"
export const ApiPort: string = "7296"
export const ApiPathAuth: string = "/auth"
export const ApiResourceGetAuthParams: string = "/getAuthParams"
export const ApiResourceGetClientIdAndSecret: string = "/getClientIdAndSecret"



//* API endpoints
export const APIGetAuthParamsEndpoint: string = `${ApiBaseUrl}:${ApiPort}${ApiPathAuth}${ApiResourceGetAuthParams}`;
export const ApiGetClientIdAndSecretEndpoint: string = `${ApiBaseUrl}:${ApiPort}${ApiPathAuth}${ApiResourceGetClientIdAndSecret}`;
// Ejemplo http://localhost:7296/auth/getAuthParams
// Ejemplo http://localhost:7296/auth/getClientIdAndSecret


//* Localhost urls
export const RedirectUri: string = "http://localhost:4200/me/home";


//* Spotify urls
export const SpotifyAuthUrl: URL = new URL("https://accounts.spotify.com/authorize");
export const SpotifyTokenUrl: string = "https://accounts.spotify.com/api/token";

//* Spotify Endpoints
export const SpotifyMe: string = "https://api.spotify.com/v1/me";
export const SpotifyTopArtists: string = "https://api.spotify.com/v1/me/top/artists";
export const SpotifySearch: string = "https://api.spotify.com/v1/search";
export const SpotifyUserAlbums: string = "https://api.spotify.com/v1/me/albums";
export const SpotifyUserLikedSongs: string = "https://api.spotify.com/v1/me/tracks";
export const SpotifyUserPlaylists: string = "https://api.spotify.com/v1/me/playlists";
export const SpotifyPlayerDevices: string = "https://api.spotify.com/v1/me/player/devices";



//* LocalStorage keys
export const accessTokenKey: string = "access_token";
export const accessTokenRefreshKey: string = "refresh_access_token";
export const accessTokenTimestampKey: string = "accessTokenTimestamp";
export const clientIdKey: string = "clientId";
export const clientSecretKey: string = "clientSecret";
export const codeVerifierKey: string = "code_verifier";
// En la url hay un parámetro llamado code. Importante no cambiar este nombre.
export const codeFromUrlKey: string = "code";
export const itemSearchTextKey: string = "itemSearchText";
export const redirectUriKey: string = "redirectUri";
export const verifierKey: string = "verifier";


//* Rutas de la aplicación
export const homeUrl: string = "/me/home";
export const loginUrl: string = "/login";
export const loginAuthUrl: string = "/login/auth";
export const myArtistsUrl: string = "/me/my-artists"
export const searchItemsUrl: string = "/me/search";


//* Otras constantes
export const appName: string = "SoniFy";
export const githubLink: string = "https://github.com/deduc";
export const email: string = "ivan_dev@outlook.es";
export const oneHourTimeStamp: number = 3600000;
export const spotifySdkPlayerName: string = "Reproductor de sonido " + appName;


// curl -X GET "https://api.spotify.com/v1/me" -H "Authorization: Bearer token"
