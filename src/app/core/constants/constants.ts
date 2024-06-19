//* API base elements
export const ApiBaseUrl: string = "https://localhost"
export const ApiPort: string = "7296"
export const ApiPathAuth: string = "/auth"
export const ApiResourceGetAuthParams: string = "/getAuthParams"
export const ApiResourceGetClientIdAndSecret: string = "/getClientIdAndSecret"



// * API endpoints
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
export const SpotifySearch: string = "https://api.spotify.com/v1/search";
export const SpotifyTopArtists: string = "https://api.spotify.com/v1/me/top/artists";
export const SpotifyTopAlbums: string = "https://api.spotify.com/v1/me/albums";


//* LocalStorage keys
export const accessTokenKey: string = "access_token";
export const accessTokenTimestampKey: string = "accessTokenTimestamp";
export const clientIdKey: string = "clientId";
export const clientSecretKey: string = "clientSecret";
export const codeVerifierKey: string = "code_verifier";
// En la url hay un parámetro llamado code. Importante no cambiar su nombre.
export const codeFromUrlKey: string = "code";
export const gotCodeFromUrlKey: string = "gotCodeFromUrl";
export const lastSearchedKey: string = "lastSearch";
export const redirectUriKey: string = "redirectUri";
export const verifierKey: string = "verifier";


//* Rutas de la aplicación
export const homeUrl: string = "/me/home";
export const loginUrl: string = "/login";
export const myArtistsUrl: string = "/my-artists"


//* Otras constantes
export const appName: string = "SoniFy";
export const githubLink: string = "https://github.com/deduc";
export const email: string = "deductivegoose@outlook.es";
export const oneHourTimeStamp: number = 3600000;


// curl -X GET "https://api.spotify.com/v1/me" -H "Authorization: Bearer token"
