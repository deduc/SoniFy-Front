import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-error',
    templateUrl: './dialog-error.component.html',
    styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent {
    public infoError: string;
    public errorDescription: string = "";

    // Importante inyectar el dato que se quiera mostrar en el dialog
    constructor(@Inject(MAT_DIALOG_DATA) infoError: string) {
        this.infoError = infoError;
        this.errorDescription = this.assingErrorDescription(infoError);
    }

    public assingErrorDescription(infoError: string){
        let errorDescription: string = "";
        
        if(infoError == "TypeError: Failed to fetch"){
            errorDescription = "La API está apagada o su url y puertos son incorrectos.";
        }

        return errorDescription;
    }

}
