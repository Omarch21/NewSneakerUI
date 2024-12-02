import { Component } from '@angular/core';
import { AuthService } from '../register-login/service/auth.service';

@Component({
    selector: 'app-list-view',
    imports: [],
    templateUrl: './list-view.component.html',
    styleUrl: './list-view.component.css'
})
export class ListViewComponent {
  
  constructor(private authService: AuthService){}
  ngOnInit(){
  }
}
