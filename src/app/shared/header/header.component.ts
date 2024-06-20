import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { appName } from 'src/app/core/constants/constants';
import { DataEmitterService } from '../../core/global-services/data-emitter.service';
import { HomeService } from '../../pages/home/home.service';

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
    private homeService: HomeService;

    constructor(router: Router, dataEmitterService: DataEmitterService, homeService: HomeService) {
        this.router = router;
        this.dataEmitterService = dataEmitterService;
        this.homeService = homeService;
    }

    ngOnInit() {
        this.getMyProfileImage();
    }

    public navigate(url: string): void {
        this.router.navigateByUrl(url);
    }

    private getMyProfileImage() {
        setTimeout(() => {
            console.log(this.homeService.myUserInfoObj.profileImageUrl);
            this.myProfileImg = this.homeService.myUserInfoObj.profileImageUrl;
        }, 200);
    }
}