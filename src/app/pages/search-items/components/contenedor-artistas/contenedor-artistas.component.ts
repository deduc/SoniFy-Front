import { Component, Input } from '@angular/core';
import { ArtistInterface } from 'src/app/core/interfaces/ArtistsInterface';

@Component({
    selector: 'search-items-contenedor-artistas',
    templateUrl: './contenedor-artistas.component.html',
    styleUrls: ['./contenedor-artistas.component.css']
})
export class ContenedorArtistasComponent {
    @Input()
    public artists: ArtistInterface[] = [];


    constructor() {}
}
