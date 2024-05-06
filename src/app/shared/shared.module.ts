import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BuscadorComponent } from './buscador/buscador.component';

// *obtener datos de formularios con ngModel
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
// modulo angular material
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    BuscadorComponent,
    FilterBarComponent,
    FooterComponent,
    HeaderComponent,
  ],
  exports: [
    BuscadorComponent,
    FilterBarComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
  ]
})
export class SharedModule { }
