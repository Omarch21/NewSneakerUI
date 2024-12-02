import { Component } from '@angular/core';
import { AuthService } from '../register-login/service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  user: any;
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.authService.getLoggedInUserData().subscribe(data=> {
      this.user = data;
      console.log(data)
    })
  }
}
