import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SneakerService } from './service/sneaker.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  standalone: true
})
export class InventoryComponent {
  shoeSizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14']
  brands = ['Nike', 'Adidas', 'New Balance', 'Yeezy', 'Air Jordan']

  shoeDivs: any[] = [];
  userSearch = new FormControl('');
  isLoading = new BehaviorSubject<boolean>(false);

  shoeForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })

  constructor(private dialog: MatDialog, private sneakerService: SneakerService) { }
  ngOnInit() {
    
    this.userSearch.valueChanges.pipe(
      debounceTime(450),
      distinctUntilChanged(),
      tap((search)=> {
        if(!search || search.length < 5)
          this.shoeDivs = [];
        else
            this.isLoading.next(true)
      }),
      filter((search: any) => search && search.length > 5),
      switchMap(
        (data: any) => this.sneakerService.searchSneakerOnline(data)
      )
    ).subscribe(data => {
      console.log(5)
      this.shoeDivs = data
      this.isLoading.next(false);
    });
  }
  submitShoe(content: any) {
    const dialogRef = this.dialog.open(content, { width: '700px', height: '600px' })
  }

  submit() {

  }

  sendFlightClub(link: any) {
    window.open(link, '_blank');
  }

}
