import { autoinject } from 'aurelia-framework';
import { AuthenticationService } from '../services/auth';

@autoinject
export class LogIn {
	authService: AuthenticationService;
	constructor(authService: AuthenticationService) {
		this.authService = authService;
	}

	activate(params: any, queryString: any, routeConfig: any) {
		this.authService.login();
	}
}