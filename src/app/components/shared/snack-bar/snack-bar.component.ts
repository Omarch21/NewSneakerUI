import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarActions, MatSnackBarAction, MatSnackBarModule, MatSnackBarLabel } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snack-bar',
    imports: [MatSnackBarModule, MatButtonModule, MatSnackBarActions, MatSnackBarAction, MatSnackBarLabel],
    templateUrl: './snack-bar.component.html',
    styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {
    emoji: string = "";
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { label: string, buttonText: string, emojis: string[] }, private dialogRef: MatSnackBarRef<SnackBarComponent>) {
        this.emoji = this.getEmoji();
    }

    getEmoji(): string {
        const index = Math.floor(Math.random() * this.data?.emojis.length);
        return this.data.emojis[index];
    }

    closeSnackbar() {
        this.dialogRef.dismiss();
    }
}
