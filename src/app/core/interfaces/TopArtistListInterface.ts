import { ArtistInterface } from "./ArtistsInterface";

export interface TopArtistListInterface {
    // Link al endpoint de Spotify
    href: string,
    // Indica la cantidad máxima de objetos ArtistInterface que va a obtener
    limit: number,
    // Endpoint para obtener los próximos objetos ArtistInterface
    next: string | null,
    // Cantidad total de artistas que se pueden obtener
    total: number,
    // Lista de artistas
    items: ArtistInterface[],
}