import { Component, Inject, inject, Injectable, signal, TemplateRef, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-popup-message',
  imports: [],
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.css'
})
export class PopupMessageComponent {
  constructor(public dialogRef: MatDialogRef<PopupMessageComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: string, message: string}){}

  closeMSG(res: boolean){
    this.dialogRef.close(res);
  }
}
