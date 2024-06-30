import { NgModule } from '@angular/core';

import { UserAlbumsComponent } from './user-albums.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';


@NgModule({
    imports: [],
    exports: [
        UserAlbumsComponent,
        AlbumCardComponent
    ],
    declarations: [
        UserAlbumsComponent,
        AlbumCardComponent
    ],
    providers: [],
})
export class UserAlbumsModule { }
