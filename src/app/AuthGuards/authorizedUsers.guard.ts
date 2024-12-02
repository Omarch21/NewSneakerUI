import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../components/register-login/service/auth.service';
import { map } from 'rxjs';

export const authorizedUsers: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isLoggedIn().pipe(
    map(isLoggedIn=>{
      if(isLoggedIn)
        return isLoggedIn
      else
        router.navigate(['/login'])
    })
  )
  //this is how it assigns if user is logged in by calling this
};
