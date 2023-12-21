export interface AlbumInfoInterface {
    album_type: string,
    api_href: string,
    api_id: string,
    artist: string,
    img_url: string,
    name: string,
    release_date: string,
    spotify_url: string,
    total_tracks: string,

    // Index signature: Sirve para convertir a string clave:valor
    [key: string]: string,
}
