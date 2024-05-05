import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BuscadorComponent } from './buscador/buscador.component';

// *obtener datos de formularios con ngModel
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BuscadorComponent,
    FooterComponent,
    HeaderComponent,
  ],
  exports: [
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
