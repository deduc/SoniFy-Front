export interface PlaylistDataInterface {
    description: string,
    idPlaylist: string,
    imageUrl: string,
    name: string,
    // tracks href de la api
    SpotifyApiSongsUrl: string,
    // url de la api para obtener esta playlist
    SpotifyApiUrl: string,
    // url a spotify
    SpotifyExternalUrl: string,
    // nombre del usuario dueño
    SpotifyOwnerUser: string,
    // url de la api para obtener el perfil del usuario creador
    SpotifyOwnerUserProfile: string,
}
