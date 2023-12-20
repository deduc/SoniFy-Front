import { Component } from '@angular/core';
import { SpotifyTokenUrl, accessTokenKey, clientIdKey, clientSecretKey } from 'src/app/core/constants/constants';


@Component({
    selector: 'pages-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    ngOnInit(): void {
        // this.loadOrCreateAccessToken();
        // let actualTime = new Date().getTime();
        // console.log(actualTime);
    }

    /**
     * Una vez el usuario ha dado permisos en la aplicación autenticadora OAuth2.0, 
     * obtengo el token de acceso a la api de spotify o utilizo el que ya tengo.
     */
    private loadOrCreateAccessToken(): void{
        // todo
        if (this.searchAccessToken() && this.verifyTime()){
            let clientId: string = localStorage.getItem(clientIdKey)!;
            let clientSecret: string = localStorage.getItem(clientSecretKey)!;
    
            let requestOptions: object = this.makeRequestOptionsObj(clientId, clientSecret);
            this.getSpotifyAccessToken(requestOptions);
        }
    }

    /**
     * Busco en localstorace el valor de la clave access_token
     */
    private searchAccessToken(): boolean{
        let semaforo: boolean = false;
        
        if(localStorage.getItem(accessTokenKey)){
            semaforo = true;
        }
        
        return semaforo;
    }

    /**
     * Comprobar que el día y la hora actual del sistema no superan en 1 hora (3600 segundos) el momento
     * donde se consiguió el token de acceso.
     */
    private verifyTime(): boolean {
        // todo
        let semaforo: boolean = false;


        return semaforo;
    }
    
    /**
     * Creo un objeto para la obtención de access_token de spotify.
     * 
     * @param clientId 
     * @param clientSecret 
     * @returns Objeto requestOptions
     */
    private makeRequestOptionsObj(clientId: string, clientSecret: string): object{
        const data = {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        };

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        };

        return requestOptions;
    }

    /**
     * Hago una consulta a la api de spotify https://accounts.spotify.com/api/token
     * para obtener un token de acceso.
     * @param requestOptions 
     */
    private getSpotifyAccessToken(requestOptions: object): void{
        // Realizar la solicitud
        fetch(SpotifyTokenUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Manejar la respuesta, el token de acceso estará en data.access_token
            console.log('Token de acceso:', data.access_token);
            localStorage.setItem(accessTokenKey, data.access_token);
            this.setTimeWhenAccessTokenWasTaken();
            })
        .catch(error => {
            console.error('Error al obtener el token:', error);
        });
    }

    private setTimeWhenAccessTokenWasTaken(): void {
        let actualTime = new Date().getTime();
        localStorage.setItem("accessTokenTimestamp", actualTime.toString())
    }
}
