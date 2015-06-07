import { inject } from 'aurelia-framework';
import {AuthenticationService} from '../services/auth';
import {AppRouter} from 'aurelia-router';

@inject(AuthenticationService, AppRouter)
export class Logout {

  constructor(authService, appRouter) {
    this.authService = authService;
    this.appRouter = appRouter;
  }

  activate() {
    this.authService.logout();
    //this.appRouter.navigate("");
  }
}