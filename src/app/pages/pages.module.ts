import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// mis componentes
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MyPlaylistsComponent } from './my-playlists/my-playlists.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

// mis modulos
import { SharedModule } from '../shared/shared.module';
// modulo http para usar el componente HttpClient
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../pages/login/login.service';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    MyPlaylistsComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    HttpClientModule,
  ],
  providers: [
    LoginService
  ]
})
export class PagesModule { }
