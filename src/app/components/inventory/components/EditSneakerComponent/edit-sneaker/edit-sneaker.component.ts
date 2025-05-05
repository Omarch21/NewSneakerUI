import { Component, Inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sneaker } from '../../../../../models/sneaker';
import { SneakerService } from '../../../service/sneaker.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { PopupMessageService } from '../../../../shared/popup-message/popup-message.service';
import { SnackbarService } from '../../../../shared/snack-bar/snack-bar.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTooltipModule} from '@angular/material/tooltip'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
    selector: 'app-edit-sneaker',
    imports: [ReactiveFormsModule, CommonModule, MatTooltipModule, MatProgressSpinnerModule],
    templateUrl: './edit-sneaker.component.html',
    styleUrl: './edit-sneaker.component.css'
})
export class EditSneakerComponent {
    isLoading: WritableSignal<boolean> = signal(false);
    shoeSizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14'];
    brands = ['Nike', 'Adidas', 'New Balance', 'Yeezy', 'Air Jordan']
    editShoeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        silhouette: new FormControl('', Validators.required),
        shoeSize: new FormControl('Size', [Validators.required]),
        brand: new FormControl('Pick Brand', Validators.required),
        cost: new FormControl('', Validators.required),
        resellURL: new FormControl('', Validators.required),
        imageURL: new FormControl('', Validators.required)
    })
    constructor(private sneakerService: SneakerService,
        private popup: PopupMessageService,
        private snackbarService: SnackbarService,
        public dialogRef: MatDialogRef<EditSneakerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.populateEditForm(this.data)
    }


    populateEditForm(sneaker: Sneaker) {
        this.editShoeForm.get('brand')?.setValue(sneaker.brand);
        this.editShoeForm.get('shoeSize')?.setValue(sneaker.size?.toString()!);
        this.editShoeForm.get('silhouette')?.setValue(sneaker.silhouette);
        this.editShoeForm.get('name')?.setValue(sneaker.nickname);
        this.editShoeForm.get('cost')?.setValue(sneaker.retail!.toString());
        this.editShoeForm.get('resellURL')?.setValue(sneaker.resellURL);
        this.editShoeForm.get('imageURL')?.setValue(sneaker.photoURL);
    }

    deleteShoe(id: any) {
        this.popup.showMessage("Confirm", "Are you sure you want to delete this sneaker?").subscribe(data => {
            if (data) {

                this.isLoading.set(true);
                this.sneakerService.deleteSneaker(id).pipe(
                    finalize(() => {
                        this.isLoading.set(false);
                    })
                ).subscribe(() => {
                    this.snackbarService.showError("Sneaker has been deleted", "Okay");
                    this.dialogRef.close(true);
                });
            }
        })
    }

    updateShoe(sneaker: any) {
        console.log(sneaker);
        sneaker.brand = this.editShoeForm.get('brand')?.value!;
        sneaker.silhouette = this.editShoeForm.get('silhouette')?.value!;
        sneaker.size = parseFloat(this.editShoeForm.get('shoeSize')?.value!);
        sneaker.resellURL = this.editShoeForm.get('resellURL')?.value!
        sneaker.retail = parseInt(this.editShoeForm.get('cost')?.value!);
        sneaker.nickname = this.editShoeForm.get('name')?.value!;

        this.sneakerService.updateSneaker(sneaker).subscribe(() => {
            this.dialogRef.close(true)
            this.snackbarService.showSuccess("Sneaker has been updated!", "Okay")
        });
    }

    close() {
        this.dialogRef.close(false);
    }
}
