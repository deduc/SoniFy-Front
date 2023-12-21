//* Spotify urls
export const SpotifyBaseUrl: string = "https://accounts.spotify.com";
export const SpotifyAuthUrl: URL = new URL(`${SpotifyBaseUrl}/authorize`);
export const SpotifyTokenUrl: string = `${SpotifyBaseUrl}/api/token`;


//* Spotify Endpoints
export const SpotifyApiBaseUrl: string = "https://api.spotify.com";
export const SpotifyMe: string = `${SpotifyApiBaseUrl}/v1/me`;


//* API endpoints
export const APIUrl: string = "https://localhost";
export const APIPort: string = "7293"
export const APIBaseUrl: string = `${APIUrl}:${APIPort}/`;
export const APIMakeAuthParams: string = `${APIBaseUrl}auth/getAuthParams`;
export const ApiGetClientSecret: string = `${APIBaseUrl}auth/getClientSecret`;
export const ApiGetClientId: string = `${APIBaseUrl}auth/getClientId`;

//* Localhost urls
export const RedirectUri: string = "http://localhost:4200/me/home";


// LocalStorage keys
export const accessTokenKey: string = "access_token";
export const accessTokenTimestampKey: string = "accessTokenTimestamp";
export const clientIdKey: string = "clientId";
export const clientSecretKey: string = "clientSecret";
export const verifierKey: string = "verifier";
export const redirectUriKey: string = "redirectUri";


// Otras variables
export const appName: string = "SoniFy";
export const githubLink: string = "https://github.com/deduc";
export const email: string = "deductivegoose@outlook.es";
export const oneHourTimeStamp: number = 3600000;


// curl -X GET "https://api.spotify.com/v1/me" -H "Authorization: Bearer BQB8aNFxqhVyPLW64UHEwu8z-CGT5K1ageoQrfqBp6kq2Qw3qXkRea6v8_Zz92gNtYAKDmyyiu-KiaB433i0jmcXIlKFwSKawDWBugkwB1zLqU5mQ6I"