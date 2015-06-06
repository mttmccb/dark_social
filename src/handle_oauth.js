import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class AccessToken {
	constructor(router, postclicks) {
		this.theRouter = router;
	}
	
	activate(params, queryString, routeConfig) {
		localStorage.setItem('access_token',params.access_token);		
		//TODO: Get user that belongs to the token
		this.theRouter.navigate("choose");
	}
}