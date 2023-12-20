import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { ApiGetClientSecret, SpotifyAuthUrl, SpotifyTokenUrl, appName } from 'src/app/core/constants/constants';
import { LoginService } from './login.service';
import { AuthParamsInterface } from './interfaces/AuthParamsInterface';
import { ClientSecretInterface } from './interfaces/ClientSecretInterface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
    public appName: string = appName;
    
    constructor(private http: HttpClient, private loginService: LoginService) { }
    
    public async login(){
        try {
            const authParams: AuthParamsInterface = await this.loginService.getAuthParams();
            const clientId: string = authParams.client_id;
            
            const clientSecret: string = await this.loginService.getClientSecret(ApiGetClientSecret);
            

            localStorage.setItem("clientId", clientId);
            localStorage.setItem("clientSecret", clientSecret);
            
            SpotifyAuthUrl.search = new URLSearchParams({...authParams}).toString();
            window.location.href = SpotifyAuthUrl.toString();
        }
        catch (err){
            console.log(err);
            
        }
    }
}
