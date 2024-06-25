import { Component } from '@angular/core';

import { appName } from './core/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title: string = appName;

    constructor() { }
}
