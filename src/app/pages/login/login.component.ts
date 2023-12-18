import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { appName } from 'src/app/core/constants/constants';
import { LoginService } from './login.service';
import { AuthParamsInterface } from './interfaces/AuthParamsInterface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
    public appName: string = appName;
    
    constructor(private http: HttpClient, private loginService: LoginService) { }
    

    public async login(){
        const authParams: AuthParamsInterface = await this.loginService.getAuthParams();
    }
}
