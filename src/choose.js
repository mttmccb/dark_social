import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';

@inject(Router)
export class Choose {
	
	determineActivationStrategy() {
		return activationStrategy.replace;
	}

	constructor(router, postclicks) {
		this.theRouter = router;
	}

	openProfile(name) {
		this.theRouter.navigateToRoute("userprofile", { user_id: name });
	}
}