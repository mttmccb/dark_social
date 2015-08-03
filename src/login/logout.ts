import { autoinject } from 'aurelia-framework';
import {AuthenticationService} from '../services/auth';

@autoinject
export class Logout {
  constructor(private authService: AuthenticationService) {
  }

  activate() {
    this.authService.logout();
  }
}