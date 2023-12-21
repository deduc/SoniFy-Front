import { Component } from '@angular/core';

import { HomeService } from './home.service';


@Component({
    selector: 'pages-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    private accessToken: string = "";

    constructor(private homeService: HomeService) {}

    async ngOnInit(): Promise<void> {
        this.accessToken = await this.homeService.checkAccessToken();
        // todo para refrescar el access token cuando expire: https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
        // todo intentar obtenre datos personales, pregunta a quien quieras yks
    }
}
