import { Component, OnInit } from '@angular/core';

import { appName, githubLink, email } from 'src/app/core/constants/constants';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    public appName: string = appName;
    public creditos: string = this.appName + ", aplicación creada por Iván Gómez en Angular v16";
    public emailContacto: string = "Email de contacto: " + email;
    public githubLink: string = githubLink;


    constructor() { }

    ngOnInit() {}

}
