import { Component, Input } from '@angular/core';

@Component({
    selector: 'shared-external-link-icon',
    templateUrl: './external-link-icon.component.html',
    styleUrls: ['./external-link-icon.component.css']
})
export class ExternalLinkIconComponent {
    @Input()
    public externalSpotifyUrl: string = "";
    
    public navigateToSpotifyWeb(): void {
        if (this.externalSpotifyUrl.length == 0) {

            throw new Error("LOL NO EKISDE")
        }
        else{
            window.open(this.externalSpotifyUrl, '_blank');
        }
    }


}
