import { Component, NgModule } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  constructor(private dialog: MatDialog){}
  submitShoe(content:any){
    const dialogRef = this.dialog.open(content, {width: '500px', height: '500px',position: })
  }
}
