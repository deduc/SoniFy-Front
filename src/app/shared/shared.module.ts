import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// *obtener datos de formularios con ngModel
import { FormsModule } from '@angular/forms';

// modulo angular material
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

// modulo httpclient para hacer peticiones http
import { HttpClientModule } from '@angular/common/http';

// componentes
import { AudioReproducerBarComponent } from './audio-reproducer-bar/audio-reproducer-bar.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

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
