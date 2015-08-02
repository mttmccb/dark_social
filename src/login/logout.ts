import { autoinject } from 'aurelia-framework';
import {AuthenticationService} from '../services/auth';
import {AppRouter} from 'aurelia-router';

@autoinject
export class Logout {
  authService: AuthenticationService;
  appRouter: AppRouter; 
  constructor(authService: AuthenticationService, appRouter: AppRouter) {
    this.authService = authService;
    this.appRouter = appRouter;
  }

  activate() {
    this.authService.logout();
  }
}