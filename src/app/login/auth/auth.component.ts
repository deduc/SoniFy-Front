import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { homeUrl } from 'src/app/core/constants/constants';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    private authService: AuthService;
    private homeUrl: string = homeUrl;
    private router: Router;
    
    constructor(authService: AuthService, router: Router) {
        // localStorage.clear();
        this.authService = authService;
        this.router = router;
    }

    ngOnInit() {
        console.log("AuthComponent -> comprobar autenticidad del usuario");
        
        let semaforo: boolean = this.authService.autenticateUser();

        if (semaforo == true) {
            this.router.navigateByUrl(this.homeUrl)
        }
    }

}
