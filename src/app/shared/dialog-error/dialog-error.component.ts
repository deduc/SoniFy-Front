import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorDataInterface } from 'src/app/core/interfaces/DialogErrorDataInterface';

@Component({
    selector: 'app-dialog-error',
    templateUrl: './dialog-error.component.html',
    styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent {
    public errorData: DialogErrorDataInterface = { description: "description", error: "error", tittle: "Error de conexión" };

    // Importante inyectar el dato que se quiera mostrar en el dialog
    constructor(@Inject(MAT_DIALOG_DATA) errorData: DialogErrorDataInterface) {
        this.errorData = { ...errorData };
    }
}
