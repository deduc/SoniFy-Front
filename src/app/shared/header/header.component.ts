import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { appName } from 'src/app/core/constants/constants';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public router: Router;
    public appName: string = appName;


    constructor(router: Router) {
        this.router = router
    }

    ngOnInit() {}

    public navigate(url: string): void{
        this.router.navigateByUrl(url);
    }
}