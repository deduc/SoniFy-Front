import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './home.component';
import { UserTopItemsComponent } from './components/user-top-items/user-top-items.component';
import { UserArtistsComponent } from './components/user-artists/user-artists.component';


@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [],
    declarations: [
        HomeComponent,
        UserArtistsComponent,
        UserTopItemsComponent,
    ],
    providers: [],
})
export class HomeModule { }
