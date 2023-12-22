import { ArtistInterface } from "./ArtistsInterface";

export interface TopArtistListInterface {
    href: string,
    limit: number,
    next: string | null,
    total: number,
    items: ArtistInterface[],
}