import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';

@autoinject
export class Choose {
	router: Router
	constructor(router: Router) {
		this.router = router;
	}
	
	determineActivationStrategy() {
		return activationStrategy.replace;
	}

	openProfile(name: number) {
		this.router.navigateToRoute("userprofile", { user_id: name }, 1);
	}
}