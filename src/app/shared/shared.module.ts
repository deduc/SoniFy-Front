import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BuscadorComponent } from './buscador/buscador.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BuscadorComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BuscadorComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
