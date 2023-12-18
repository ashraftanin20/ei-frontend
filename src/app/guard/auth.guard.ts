import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service: UserService = inject(UserService);
  const router: Router = inject(Router);

  if(service.isUserLoggedIn()) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  } 
};
