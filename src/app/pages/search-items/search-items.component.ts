import { Component, OnInit } from '@angular/core';

// constantes
import { itemSearchTextKey, SpotifySearch } from 'src/app/core/constants/constants';
// servicios
import { SearchItemsService } from './search-items.service';
// interfaces
import { AlbumDataInterface } from 'src/app/core/interfaces/AlbumDataInterface';
import { ArtistInterface } from 'src/app/core/interfaces/ArtistsInterface';
import { PlaylistDataInterface } from 'src/app/core/interfaces/PlaylistsDataInterface';
import { TrackInfoInterface } from 'src/app/core/interfaces/TrackInfoInterface';


@Component({
    selector: 'pages-search-items',
    templateUrl: './search-items.component.html',
    styleUrls: ['./search-items.component.css']
})
export class SearchItemsComponent implements OnInit {
    // palabras buscadas por el usuario, encontradas en localStorage
    public itemSearchText: string = "";
    public spotifySearchBaseEndpoint: string = SpotifySearch;

    // * listas de objetos que renderiza el html
    public artists: ArtistInterface[] = [];
    public albums: AlbumDataInterface[] = [];
    public playlists: PlaylistDataInterface[] = [];
    public tracks: TrackInfoInterface[] = [];

    private searchItemsService: SearchItemsService;
    private searchSpotifyEndpoint: string = "null_searchSpotifyEndpoint_value";
    private typeToSearch: string = "track%2Cartist%2Cplaylist%2Calbum";
    private limit: number = 6;


    constructor(searchItemsService: SearchItemsService) {
        this.searchItemsService = searchItemsService;

        this.doUpdateItemSearchText();
    }

    ngOnInit() {
        this.doSearchContentInSpotifyAPI();
    }


    public doSearchContentInSpotifyAPI() {
        this.doUpdateItemSearchText();

        this.searchItemsService.doSearchContentInSpotifyAPI(this.searchSpotifyEndpoint)
            .subscribe((apiResponse: any) => {
                console.log(111, apiResponse);

                this.albums = this.searchItemsService.loadAndBuildAlbums(apiResponse.albums);
                this.artists = this.searchItemsService.loadAndBuildArtists(apiResponse.artists);
                this.playlists = this.searchItemsService.loadAndBuildPlaylists(apiResponse.playlists);
                this.tracks = this.searchItemsService.loadAndBuildTracks(apiResponse.tracks);
            });
    }

    // * metodos privados
    // * metodos privados
    // * metodos privados

    private doBuildSearchSpotifyEndpoint(spotifySearchBaseEndpoint: string, itemSearchText: string, typeToSearch: string) {
        return `${spotifySearchBaseEndpoint}?q=${itemSearchText}&type=${typeToSearch}&limit=${this.limit}`;
    }

    private doUpdateItemSearchText(): void {
        this.itemSearchText = localStorage.getItem(itemSearchTextKey)!;

        this.searchSpotifyEndpoint = this.doBuildSearchSpotifyEndpoint(
            this.spotifySearchBaseEndpoint, this.itemSearchText, this.typeToSearch
        );
    }
}
