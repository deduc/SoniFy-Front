import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BuscadorComponent } from './buscador/buscador.component';

// *obtener datos de formularios con ngModel
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './filter-bar/filter-bar.component';

// modulo angular material
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';

// modulo httpclient para hacer peticiones http
import { HttpClientModule } from '@angular/common/http';
import { AudioReproducerBarComponent } from './audio-reproducer-bar/audio-reproducer-bar.component';

@NgModule({
    declarations: [
        AudioReproducerBarComponent,
        BuscadorComponent,
        DialogErrorComponent,
        FilterBarComponent,
        FooterComponent,
        HeaderComponent,
    ],
    exports: [
        AudioReproducerBarComponent,
        BuscadorComponent,
        DialogErrorComponent,
        FilterBarComponent,
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatDialogModule,
        HttpClientModule,
    ]
})
export class SharedModule { }
