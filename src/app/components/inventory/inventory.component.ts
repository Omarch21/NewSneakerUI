import { CommonModule } from '@angular/common';
import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SneakerService } from './service/sneaker.service';
import { BehaviorSubject, finalize, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Sneaker } from '../../models/sneaker';
import { AuthService } from '../register-login/service/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { PopupMessageService } from '../shared/popup-message/popup-message.service';
import { SnackbarService } from '../shared/snack-bar/snack-bar.service';
import { AddSneakerComponent } from './components/AddSneakerComponent/add-sneaker/add-sneaker.component';
import { EditSneakerComponent } from './components/EditSneakerComponent/edit-sneaker/edit-sneaker.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
  imports: [ReactiveFormsModule, CommonModule, MatProgressSpinnerModule, MatTooltipModule,MatButtonModule,MatIconModule],
  standalone: true
})
export class InventoryComponent {
  shoeSizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14']
  brands = ['Nike', 'Adidas', 'New Balance', 'Yeezy', 'Air Jordan']

  shoeDivs: any[] = [];
  userSearch = new FormControl('');
  isLoadingSearch = new BehaviorSubject<boolean>(false);
  isLoading: WritableSignal<boolean> = signal(false);
  showSearch: WritableSignal<boolean> = signal(false);
  user: User | undefined;
  sneakers: Sneaker[] = [];

  @ViewChild('shoeSearch') searchBar!: ElementRef;

  constructor(private dialog: MatDialog, private sneakerService: SneakerService, private authService: AuthService, private router: Router, private popup: PopupMessageService, private snackbarService: SnackbarService) { }

  ngOnInit() { this.refreshSneakers(); }

  goShoeInfo(id: number | undefined) {
    this.router.navigate([`inventory/sneaker/${id}`])
  }

  openAddDialog() {
    const dialog = this.dialog.open(AddSneakerComponent, { width: '700px', height: '400px', autoFocus: false })
    dialog.afterClosed().pipe(
      tap((res: boolean) => {
        console.log(res)
        if (res == true)
          this.refreshSneakers();
      })
    ).subscribe();
  }

  openEdit(sneaker: Sneaker) {
    const dialog = this.dialog.open(EditSneakerComponent, { width: '550px', height: '450px', data: sneaker, autoFocus: false })
    dialog.afterClosed().pipe(
      tap((data: boolean) => {
        console.log(data)
        if (data){
          this.refreshSneakers();
          console.log(data)
        }
      })
    ).subscribe();
  }

  refreshSneakers() {
    this.isLoading.set(true)
    this.authService.getLoggedInUserData().pipe(
      tap(user => this.user = user),
      switchMap(user => this.sneakerService.getSneakersByUserId(user.id)),
    ).subscribe((sneakers: any[]) => {
      this.sneakers = sneakers;
      this.isLoading.set(false)
    })
  }

}
