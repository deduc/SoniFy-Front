import { Component } from '@angular/core';

import { appName } from './core/constants/constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public title: string = appName;
}
