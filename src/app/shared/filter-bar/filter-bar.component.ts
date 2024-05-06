import { Component, OnInit } from '@angular/core';

import { DataEmitterService } from 'src/app/core/global-services/data-emitter.service';

import { ArtistCardInfoInterface } from 'src/app/pages/home/components/user-top-artists/Interfaces/ArtistCardInfoInterface';


@Component({
    selector: 'shared-filter-bar',
    templateUrl: './filter-bar.component.html',
    styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
    public artistCardList: ArtistCardInfoInterface[] = [];
    public inputPlaceholder: string = "¿Qué artista quieres?";
    // * ngModel
    public toSearchArtist: string = "";
    public orderType: string = "";
    public orderDesc: string = "keyboard_arrow_down";
    public orderAsc: string = "keyboard_arrow_up";

    private dataEmitterService: DataEmitterService;

    constructor(dataEmitterService: DataEmitterService) {
        this.orderType = this.orderDesc;
        this.dataEmitterService = dataEmitterService;
    }

    ngOnInit() {
        // Me suscribo al observable para obtener el array que me interesa
        this.dataEmitterService.getArtistCardInfo()
            .subscribe(res => {
                console.log("FilterBarComponent.ngOnInit() -> ", res);
                this.artistCardList = res;
            });
    }

    /** Invocado desde filter-bar.component.html. Invierte el orden de filtrado */
    public alterOrder(): void {
        let orderType: string = this.orderType;
        let orderDesc: string = this.orderDesc;
        let orderAsc: string = this.orderAsc;

        this.orderType = this.toggleOrderIcon(orderType, orderDesc, orderAsc);
        this.artistCardList = this.sortArtistCardInfo(this.artistCardList, orderType);
    }

    /** Intercambiar el icono de ordenación (ascendente o descendente) */
    private toggleOrderIcon(orderType: string, orderDesc: string, orderAsc: string): string {
        // Condicion ? expresion true : expresion false
        return orderType === orderDesc ? orderAsc : orderDesc;
    }

    // todo
    /** Ordenar los artistas alfabeticamente */
    private sortArtistCardInfo(artistCardInfo: ArtistCardInfoInterface[], orderType: string): ArtistCardInfoInterface[] {
        return artistCardInfo;
    }
}
