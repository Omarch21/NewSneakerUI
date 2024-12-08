import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, Router } from '@angular/router';
import { AuthService } from './components/register-login/service/auth.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, CommonModule, RouterModule,MatProgressSpinnerModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SneakerProject';
  asd: boolean = false;
  constructor(public authService: AuthService, private router: Router){}
  
  ngOnInit(): void{
  }

  logout(){
    this.authService.logoutUser().pipe(finalize(()=>this.router.navigate(['/user']))).subscribe();
  }
  
  goToLandingPage(){
    this.router.navigate(['/'])
  }
}
