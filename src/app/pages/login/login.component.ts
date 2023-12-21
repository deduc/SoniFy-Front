import { Component } from '@angular/core';

import { ApiGetClientSecret, SpotifyAuthUrl, appName } from 'src/app/core/constants/constants';
import { LoginService } from './login.service';
import { AuthParamsInterface } from './interfaces/AuthParamsInterface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
    public appName: string = appName;
    
    constructor(private loginService: LoginService) { }

    ngOnInit(): void {
        // todo
        // ! Temporal, borrar cuando esté a punto
        localStorage.clear();
    }
    
    public async login(){
        try {
            const authParams: AuthParamsInterface = await this.loginService.getAuthParams();
            const clientId: string = authParams.client_id;
            const clientSecret: string = await this.loginService.getClientSecret(ApiGetClientSecret);

            localStorage.setItem("clientId", clientId);
            localStorage.setItem("clientSecret", clientSecret);

            console.log(authParams);
            
            
            SpotifyAuthUrl.search = new URLSearchParams({...authParams}).toString();
            window.location.href = SpotifyAuthUrl.toString();
        }
        catch (err){
            console.log(err);
            
        }
    }
}
