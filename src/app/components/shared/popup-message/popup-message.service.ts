import { Inject, Injectable, signal, WritableSignal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PopupMessageComponent } from "./popup-message.component";
@Injectable({
    providedIn: 'root'
})
export class PopupMessageService{
    
    constructor(private dialog: MatDialog){}

    showMessage(title: string, message: string){
        const ref = this.dialog.open(PopupMessageComponent, {width:'350px', height:'200px', data: {title, message}})
        return ref.afterClosed();
    }
}