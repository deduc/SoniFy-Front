import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';
import { UserTopAlbumsComponent } from './components/user-top-items/user-top-albums.component';
import { UserTopArtistsComponent } from './components/user-artists/user-top-artists.component';


@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [],
    declarations: [
        HomeComponent,
        UserTopArtistsComponent,
        UserTopAlbumsComponent
    ],
    providers: [],
})
export class HomeModule { }
