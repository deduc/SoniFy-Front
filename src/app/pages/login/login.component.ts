import { Component } from '@angular/core';

import { APIGetAuthParamsEndpoint, SpotifyAuthUrl, appName, redirectUriKey } from 'src/app/core/constants/constants';
import { LoginService } from './login.service';
import { AuthParamsInterface } from './interfaces/AuthParamsInterface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
    public appName: string;
    public redirectUriKey: string;

    private getAuthParamsEndpoint: string = APIGetAuthParamsEndpoint;
    
    constructor(private loginService: LoginService) { 
        this.appName = appName
        this.redirectUriKey = redirectUriKey
    }

    ngOnInit(): void {
        // todo
        // ! Temporal, borrar cuando esté a punto
        localStorage.clear();
    }
    
    public async login(){
        try {
            const authParams: AuthParamsInterface = await this.loginService.getAuthParams(this.getAuthParamsEndpoint);
            
            localStorage.setItem(this.redirectUriKey, authParams.redirect_uri)

            // Redirecciono al usuario a una pantalla de login con el servicio OAuth2.0
            SpotifyAuthUrl.search = new URLSearchParams({...authParams}).toString();
            window.location.href = SpotifyAuthUrl.toString();
        }
        catch (err){
            console.log(err);
        }

        // fin metodo
    }

    // fin clase
}
