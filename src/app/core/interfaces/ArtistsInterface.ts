export interface ArtistInterface {
    // Enlace del artista en spotify
    external_url: string,
    // Lista de géneros musicales
    genres: string[],
    // Sirve para hacer peticiones a la api para obtener información más detallada sobre el artista
    id: string,
    // Imagen
    image_url: string,
    // Nombre del artista
    name: string,
}