import { Component, ElementRef, Inject, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FetchedSneakerData } from '../../../../../models/fetchedSneakerData';
import { Sneaker } from '../../../../../models/sneaker';
import { SneakerService } from '../../../service/sneaker.service';
import { User } from '../../../../../models/user';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, finalize, switchMap, tap } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../shared/snack-bar/snack-bar.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule, MatProgressSpinner } from '@angular/material/progress-spinner';
import { CustomValidators } from '../../../../../customValidators';
import { AuthService } from '../../../../register-login/service/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
    selector: 'app-add-sneaker',
    imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule, MatTooltipModule],
    templateUrl: './add-sneaker.component.html',
    styleUrl: './add-sneaker.component.css'
})
export class AddSneakerComponent {

    shoeSizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14']
    brands = ['Nike', 'Adidas', 'New Balance', 'Yeezy', 'Air Jordan']

    user: User | undefined;
    isLoading: WritableSignal<boolean> = signal(false);
    isLoadingSearch = new BehaviorSubject<boolean>(false);
    showSearch: WritableSignal<boolean> = signal(false);
    userSearch = new FormControl('');
    shoeDivs: any[] = [];
    activeTab: number = 1;

    @ViewChild('shoeSearch') searchBar!: ElementRef;
    search: string = '';

    shoeForm = new FormGroup({
        name: new FormControl('', Validators.required),
        silhouette: new FormControl('', Validators.required),
        shoeSize: new FormControl('Size', [Validators.required,CustomValidators.numberValidator]),
        brand: new FormControl('Pick Brand', Validators.required),
        cost: new FormControl('', Validators.required),
        resellURL: new FormControl('', Validators.required),
        imageURL: new FormControl('', Validators.required)
    })

    
    constructor(private sneakerService: SneakerService, 
                public dialogRef: MatDialogRef<AddSneakerComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: any, 
                private snackbarService: SnackbarService,
                private authService: AuthService) { }

    ngOnInit() {
        this.userSearch.valueChanges.pipe(
            debounceTime(450),
            distinctUntilChanged(),
            tap((search) => {
                if (!search || search.length < 5)
                    this.shoeDivs = [];
                else {
                    this.showSearch.set(true)
                    this.isLoadingSearch.next(true)
                }
            }),
            filter((search: any) => search && search.length > 5),
            switchMap(
                (data: any) => this.sneakerService.searchSneakerOnline(data)
            )
        ).subscribe(data => {
            this.shoeDivs = data
            this.isLoadingSearch.next(false);
        });

        this.authService.getLoggedInUserData().subscribe(data=> this.user = data);
    }

    populateForm(sneaker: FetchedSneakerData) {
        this.showSearch.set(false);
        this.searchBar.nativeElement.value = sneaker.name;

        this.shoeForm.get('brand')?.setValue(sneaker.brand);
        this.shoeForm.get('name')?.setValue(sneaker.nickname);
        this.shoeForm.get('resellURL')?.setValue(sneaker.link);
        this.shoeForm.get('imageURL')?.setValue(sneaker.imageLink);
        if (sneaker.jordanNumber > 0)
            this.shoeForm.get('silhouette')?.setValue(`Jordan ${sneaker.jordanNumber}`);

        //this.getMoreData(sneaker);
    }

    addShoe() {
        const sneaker: Sneaker = {
            retail: parseInt(this.shoeForm.get('cost')?.value!),
            nickname: this.shoeForm.get('name')?.value!,
            silhouette: this.shoeForm.get('silhouette')?.value!,
            brand: this.shoeForm.get('brand')?.value!,
            size: parseFloat(this.shoeForm.get('shoeSize')?.value!),
            photoURL: this.shoeForm.get('imageURL')?.value!,
            resellURL: this.shoeForm.get('resellURL')?.value!,
            userID: this.user?.id
        }

        this.isLoading.set(true)
        this.sneakerService.addSneaker(sneaker).pipe(
            finalize(() => {
                this.isLoading.set(false)
            })
        ).subscribe(() => {
            this.snackbarService.showSuccess("Sneaker has been successfully added.", "Okay")
            this.dialogRef.close(true);
        });
        
    }

    close() {
        this.dialogRef.close(false);
    }

    changeTab(num: number) {
        this.activeTab = num;
    }

    getMoreData(sneaker: FetchedSneakerData) {
        const sneaker1: Sneaker = {
            retail: 190,
            nickname: this.shoeForm.get('name')?.value!,
            silhouette: this.shoeForm.get('silhouette')?.value!,
            brand: this.shoeForm.get('brand')?.value!,
            size: 9,
            photoURL: this.shoeForm.get('imageURL')?.value!,
            resellURL: this.shoeForm.get('resellURL')?.value!,
            userID: this.user?.id
        }
        this.sneakerService.get1More(sneaker1).subscribe();
    }

    clearSearch(){
        this.search = "";
    }

    isClearable(): boolean{
        return this.search.length > 0
    }

}
