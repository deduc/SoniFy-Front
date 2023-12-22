import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ArtistasFavoritosComponent } from './components/artistas-favoritos/artistas-favoritos.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [],
    declarations: [
        HomeComponent,
        ArtistasFavoritosComponent,
    ],
    providers: [],
})
export class HomeModule { }
