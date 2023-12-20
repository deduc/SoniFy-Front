import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { accessTokenKey } from './constants/constants';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor() {}

    public canActivate(){
        return this.doCheckAccessToken();
    }

    private doCheckAccessToken(): boolean{
        if (localStorage.getItem(accessTokenKey)){
            return true;
        }
        else{
            return false;
        }
    }
}
