//* Spotify urls
export const SpotifyAuthUrl: URL = new URL("https://accounts.spotify.com/authorize");
export const SpotifyTokenUrl: string = "https://accounts.spotify.com/api/token";

//* API endpoints
export const APIUrl: string = "https://localhost";
export const APIPort: string = "7293"
export const APIBaseUrl: string = `${APIUrl}:${APIPort}/`;
export const APIMakeAuthParams: string = `${APIBaseUrl}auth/getAuthParams`;
export const ApiGetClientSecret: string = `${APIBaseUrl}auth/getClientSecret`;

// LocalStorage keys
export const accessTokenKey: string = "access_token";
export const clientIdKey: string = "clientId";
export const clientSecretKey: string = "clientSecret";

// Otras variables
export const appName: string = "SoniFy";
export const githubLink: string = "https://github.com/deduc";
export const email: string = "deductivegoose@outlook.es";
