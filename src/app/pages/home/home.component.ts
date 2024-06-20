import { Component, OnInit } from '@angular/core';
import { accessTokenKey } from 'src/app/core/constants/constants';
import { HomeService } from './home.service';


@Component({
    selector: 'pages-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private accessToken: string = "";
    private accessTokenKey: string;
    private homeService: HomeService;
    
    constructor(homeService: HomeService) {
        this.accessTokenKey = accessTokenKey;
        this.accessToken = localStorage.getItem(this.accessTokenKey)!;
        this.homeService = homeService;
        
        // this.accessToken = this.homeService.loadTokenFromLocalStorage();
    }

    public ngOnInit(): void {
        // todo: para refrescar el access token cuando expire: https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
        // todo: intentar obtener datos personales y mostrarlos en la cabecera arriba a la derecha
        // todo: poner boton de log out
    }
    
    // fin clase
}