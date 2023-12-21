import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor() {}

    public canActivate(){
        return this.doCheckAccessToken();
    }

    private doCheckAccessToken(): boolean{
        return true;
        // if (localStorage.getItem(accessTokenKey)){
        //     return true;
        // }
        // else{
        //     return false;
        // }
    }
}
