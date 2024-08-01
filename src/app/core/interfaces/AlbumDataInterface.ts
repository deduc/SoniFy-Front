export interface AlbumDataInterface {
    api_href: string,
    api_id: string,
    artistName: string,
    idArtist: string,
    img_url: string,
    name: string,
    release_date: string,
    spotify_url: string,
    total_tracks: string,

    // Index signature: Sirve para convertir a string clave:valor
    [key: string]: string,
}
