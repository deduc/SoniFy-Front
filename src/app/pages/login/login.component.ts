import { Component } from '@angular/core';

import { APIGetAuthParamsEndpoint, SpotifyAuthUrl, appName, redirectUriKey } from 'src/app/core/constants/constants';
import { LoginService } from './login.service';
import { AuthParamsInterface } from './interfaces/AuthParamsInterface';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from 'src/app/shared/dialog-error/dialog-error.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public appName: string;
    public redirectUriKey: string;

    private getAuthParamsEndpoint: string = APIGetAuthParamsEndpoint;

    constructor(private loginService: LoginService, private dialog: MatDialog) {
        this.appName = appName
        this.redirectUriKey = redirectUriKey
    }

    ngOnInit(): void {
        // todo
        // ! Temporal, borrar cuando esté a punto
        localStorage.clear();
    }

    // Se invoca desde login.component.html
    public async login(): Promise<void> {
        try {
            const authParams: AuthParamsInterface = await this.loginService.getAuthParams(this.getAuthParamsEndpoint);

            localStorage.setItem(this.redirectUriKey, authParams.redirect_uri)

            // Redirecciono al usuario a una pantalla de login con el servicio OAuth2.0.
            // Cuando el usuario acepta OAuth2.0, redirijo al usuario a "home.component.html", ruta "/me/home"
            SpotifyAuthUrl.search = new URLSearchParams({ ...authParams }).toString();
            window.location.href = SpotifyAuthUrl.toString();
        }
        catch (err: any) {
            console.log(err);
            this.openDialog(err.message);
        }

        // fin metodo
    }

    public openDialog(error: string): void {
        let infoError = { data: error }
        this.dialog.open(DialogErrorComponent, infoError);
    }

    // fin clase
}
