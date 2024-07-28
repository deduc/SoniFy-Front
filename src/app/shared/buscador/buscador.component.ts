import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Router } from '@angular/router';
import { itemSearchTextKey, searchItemsUrl } from 'src/app/core/constants/constants';


@Component({
    selector: 'shared-buscador',
    templateUrl: './buscador.component.html',
    styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent  {
    // necesario para actualizar los componentes que utilicen el buscador
    @Output()
    clickBoton = new EventEmitter<void>();

    @Input()
    public inputPlaceholderText: string = "¿Qué quieres escuchar?";

    public itemSearchTextKey: string = itemSearchTextKey;
    // * Obtener el texto que hay en el input mediante ngModel y FormsModule desde shared-module
    public searchText: string = "";
    
    private searchItemsUrl: string = searchItemsUrl;

    constructor(private router: Router) { }

    public searchContent() {
        if (this.searchText.length == 0) return;

        localStorage.setItem(this.itemSearchTextKey, this.searchText);
        this.router.navigateByUrl(this.searchItemsUrl);

        // emito el evento click para actualizar el comopnente que utilice a este
        this.clickBoton.emit();
    }
}
