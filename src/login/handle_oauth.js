import { inject } from 'aurelia-framework';
import { AuthenticationService } from '../../services/auth';
import { Router } from 'aurelia-router';

@inject(AuthenticationService, Router)
export class HandleOAuth {

	constructor(authService, router) {
		this.authService = authService;
		this.theRouter = router;
	}

	activate(params, queryString, routeConfig) {
		this.authService.handleLogin(params.access_token).then(() => { 
			this.theRouter.navigate("");		
		});
	}
}