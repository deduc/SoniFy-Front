import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-buscador',
    templateUrl: './buscador.component.html',
    styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    public buscarCancionOGrupo(): void{
        // todo
        // vaciar el contenido del input
        // invocar a buscador.service para hacer peticion de la cancion o grupo a la api
        alert("Hay cosas que hacer")
    }

}
