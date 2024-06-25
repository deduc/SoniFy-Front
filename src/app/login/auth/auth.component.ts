import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    private authService: AuthService;
    
    constructor(authService: AuthService) {
        // localStorage.clear();
        this.authService = authService;
    }

    ngOnInit() {
        let semaforo: boolean = false;
        
        // TODO
        semaforo = this.authService.autenticateUser();

        console.log(semaforo);
        
    }

}
