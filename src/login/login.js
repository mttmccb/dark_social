import { inject } from 'aurelia-framework';
import { AuthenticationService } from '../services/auth';

@inject(AuthenticationService)
export class LogIn {
	
	constructor(authService) {
		this.authService = authService;
	}

	activate(params, queryString, routeConfig) {
		this.authService.login();
	}
}