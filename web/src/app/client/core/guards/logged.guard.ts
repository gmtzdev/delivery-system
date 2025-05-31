import { EnvironmentInjector, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const enviromnetInject = inject(EnvironmentInjector);
  const router: Router = enviromnetInject.get(Router);

  // router.navigate(['login']);
  return true;
};
