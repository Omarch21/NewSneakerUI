import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../components/register-login/service/auth.service';
import { map, tap } from 'rxjs';

export const authorizedUsers: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.checkLoggedIn().pipe(
    tap(isLoggedIn=>{
      if(isLoggedIn)
        return isLoggedIn
      else{
        router.navigate(['/login'])
        return isLoggedIn;
      }
    })
  )
  //this is how it assigns if user is logged in by calling this
};
