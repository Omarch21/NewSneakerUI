import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, Router } from '@angular/router';
import { AuthService } from './components/register-login/service/auth.service';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, CommonModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SneakerProject';
  check: boolean = false;
  constructor(public authService: AuthService, private router: Router){}

  ngOnInit(): void{
  }

  logout(){
    this.authService.logoutUser().subscribe(()=> {this.router.navigate(['/user'])});
  }
  
  goToLandingPage(){
    this.router.navigate(['/'])
  }
}
