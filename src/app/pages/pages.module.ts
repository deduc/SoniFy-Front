import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// mis componentes
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyArtistsComponent } from './my-artists/my-artists.component';

// mis modulos
import { SharedModule } from '../shared/shared.module';
import { HomeModule } from './home/home.module';
// modulo http para usar el componente HttpClient
import { HttpClientModule } from '@angular/common/http';
// modulo angular material
import { MatIconModule } from '@angular/material/icon';

import { LoginService } from '../pages/login/login.service';


@NgModule({
  declarations: [
    // HomeComponent,
    LoginComponent,
    MyPlaylistsComponent,
    MyProfileComponent,
    MyArtistsComponent,
  ],
  imports: [
    CommonModule,
    HomeModule,
    MatIconModule,
    SharedModule,
    PagesRoutingModule,
    HttpClientModule,
  ],
  providers: [
    LoginService
  ]
})
export class PagesModule { }
