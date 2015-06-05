import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class AccessToken {
	constructor(router, postclicks) {
		this.theRouter = router;
	}
	
	activate(params, queryString, routeConfig) {
		localStorage.setItem('userToken',params.access_token);		
		this.theRouter.navigate("choose");
	}
}