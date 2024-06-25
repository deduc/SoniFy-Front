import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { appName } from 'src/app/core/constants/constants';
import { DataEmitterService } from '../../core/global-services/data-emitter.service';

@Component({
    selector: 'shared-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public router: Router;
    public appName: string = appName;
    public myProfileImg: string = "";
    
    private dataEmitterService: DataEmitterService;

    constructor(router: Router, dataEmitterService: DataEmitterService) {
        this.router = router;
        this.dataEmitterService = dataEmitterService;
    }

    ngOnInit() {
        this.getMyProfileImage();
    }

    public navigate(url: string): void {
        this.router.navigateByUrl(url);
    }

    private getMyProfileImage() {
        setTimeout(() => {
            // todo: ya no existe homeservice, hazlo de otra manera porque no mola que los componentes invoquen cosas raras de fuera
            // console.log(this.homeService.myUserInfoObj.profileImageUrl);
            // this.myProfileImg = this.homeService.myUserInfoObj.profileImageUrl;
        }, 200);
    }
}