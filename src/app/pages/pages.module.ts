import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// mis componentes
import { PagesRoutingModule } from './pages-routing.module';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyArtistsComponent } from './my-artists/my-artists.component';

// mis modulos
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from './home/home.module';
// modulo http para usar el componente HttpClient
import { HttpClientModule } from '@angular/common/http';
// modulos angular material
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { SearchItemsModule } from './search-items/search-items.module';


@NgModule({
    declarations: [
        // * No declaro HomeComponent porque ya importo su módulo
        MyPlaylistsComponent,
        MyProfileComponent,
        MyArtistsComponent,
    ],
    imports: [
        CommonModule,
        HomeModule,
        HttpClientModule,
        
        // modulos angular material
        MatIconModule,
        MatTabsModule,
        
        PagesRoutingModule,
        SharedModule,
        SearchItemsModule,
    ],
    providers: []
})
export class PagesModule { }
