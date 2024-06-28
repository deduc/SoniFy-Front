import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { appName } from 'src/app/core/constants/constants';
import { DataEmitterService } from '../../core/global-services/data-emitter.service';
import { HomeService } from '../../pages/home/home.service';
import { MyUserInfoInterface } from 'src/app/core/interfaces/MyUserInfoInterface';

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
        this.homeService = homeService;
        this.dataEmitterService = dataEmitterService;
    }

    ngOnInit() {
        this.getMyProfileImage();
    }

    public navigate(url: string): void {
        this.router.navigateByUrl(url);
    }

    private getMyProfileImage() {
        this.homeService.userInfo$.subscribe((userData: any) => {
            let userDataAux: MyUserInfoInterface = { ...userData };
            this.myProfileImg = userDataAux.profileImageUrl;
        });
    }
}