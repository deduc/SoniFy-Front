import { Component, OnInit } from '@angular/core';

import { HomeService } from './home.service';


@Component({
    selector: 'pages-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {    
    private homeService: HomeService;

    constructor(homeService: HomeService) {
        this.homeService = homeService;
    }

    async ngOnInit(): Promise<void> {
        await this.homeService.getAccessToken();
        
        // prueba
        // await fetchProfile(localStorage.getItem(accessTokenKey)!);


        // todo para refrescar el access token cuando expire: https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
        // todo intentar obtenre datos personales, pregunta a quien quieras yks
    }

    // ! Este método quizá no deba estar aqui
    private async fetchProfile(token: string): Promise<any> {
        console.log("token", token);
        
        try {
            const result = await fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
        
            if (!result.ok) {
                throw new Error(`Error: ${result.status} - ${result.statusText}`);
            }
        
            const data = await result.json();
            console.log(data);
            
            return data;
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            throw error; // Puedes lanzar el error nuevamente para que sea manejado por el código que llama a esta función.
        }
    }

    // fin clase
}
