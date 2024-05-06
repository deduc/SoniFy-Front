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

    public alterOrder(): void {
        if (this.orderType == this.orderDesc) {
            this.orderType = this.orderAsc
        }
        else {
            this.orderType = this.orderDesc
        }
    }
}
