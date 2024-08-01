import { Component, Input } from '@angular/core';
import { TrackInfoInterface } from 'src/app/core/interfaces/TrackInfoInterface';

@Component({
  selector: 'search-items-contenedor-canciones',
  templateUrl: './contenedor-canciones.component.html',
  styleUrls: ['./contenedor-canciones.component.css']
})
export class ContenedorCancionesComponent  {
    @Input()
    public tracks: TrackInfoInterface[] = [];

}
