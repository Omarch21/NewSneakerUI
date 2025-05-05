import { Component, Inject, Injectable, signal, WritableSignal } from "@angular/core";
import {MatSnackBar,MatSnackBarLabel} from '@angular/material/snack-bar'
import { MatDialog } from "@angular/material/dialog";
import { SnackBarComponent } from "./snack-bar.component";
@Injectable({
    providedIn: 'root'
})
@Component({
    template: '',
    styleUrl: './snack-bar.component.css'
})
export class SnackbarService{
    
    constructor(private snackbar: MatSnackBar){}

    showSuccess(label:any, buttonText:any){
        this.snackbar.openFromComponent(SnackBarComponent,{duration: 5000, data: {label, buttonText, emojis:['🔥','✔️','💯']}, panelClass:['snackbar-class']});
    }

    showRegular(label:any, buttonText:any){
        this.snackbar.openFromComponent(SnackBarComponent,{duration: 5000, data: {label, buttonText, emojis: ['😎','😃','🧐']}, panelClass:['snackbar-class']});
    }

    showError(label:any, buttonText:any){
        this.snackbar.openFromComponent(SnackBarComponent,{duration: 5000, data: {label, buttonText, emojis: ['❌']}, panelClass:['snackbar-class']});
    }
}