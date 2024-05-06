import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from 'src/app/shared/shared.module';


// modulo angular material
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        SharedModule,
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class MyArtistsModule { }
