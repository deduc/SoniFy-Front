import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BuscadorComponent } from './buscador/buscador.component';
// fomrularios
import { FormsModule } from '@angular/forms';
import { AlbumCardComponent } from './album-card/album-card.component';


@NgModule({
  declarations: [
    AlbumCardComponent,
    BuscadorComponent,
    FooterComponent,
    HeaderComponent,
  ],
  exports: [
    AlbumCardComponent,
    BuscadorComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
