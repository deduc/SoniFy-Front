export class UserLikedSongs {
    // contenedor de objetos con atributos fecha y "track" o cancion. Esta segunda contiene mucha info sobre la cancion, su artista, album...
    public numberOfSongs: number = 0;
    public songsObjList: any[] = [];
    public SpotifyApiNextSongsUrl: string = "";
    public SpotifyApiEndpoint: string = "";
}
