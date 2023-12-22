//* Spotify urls
export const SpotifyAuthUrl: URL = new URL("https://accounts.spotify.com/authorize");
export const SpotifyTokenUrl: string = "https://accounts.spotify.com/api/token";


//* Spotify Endpoints
export const SpotifyMe: string = "https://api.spotify.com/v1/me";
export const SpotifySearch: string = "https://api.spotify.com/v1/search";


//* API endpoints
export const APIGetAuthParamsEndpoint: string = "https://localhost:7293/auth/getAuthParams";
export const ApiGetClientIdAndSecret: string = "https://localhost:7293/auth/getClientIdAndSecret";

//* Localhost urls
export const RedirectUri: string = "http://localhost:4200/me/home";


//* LocalStorage keys
export const accessTokenKey: string = "access_token";
export const accessTokenTimestampKey: string = "accessTokenTimestamp";
export const clientIdKey: string = "clientId";
export const clientSecretKey: string = "clientSecret";
export const verifierKey: string = "verifier";
export const redirectUriKey: string = "redirectUri";
export const lastSearchedKey: string = "lastSearch";
export const codeVerifierKey: string = "code_verifier";
export const codeFromUrlKey: string = "code";


//* Rutas de la aplicación
export const loginUrl: string = "/login";


//* Otras constantes
export const appName: string = "SoniFy";
export const githubLink: string = "https://github.com/deduc";
export const email: string = "deductivegoose@outlook.es";
export const oneHourTimeStamp: number = 3600000;





// curl -X GET "https://api.spotify.com/v1/me" -H "Authorization: Bearer token"
