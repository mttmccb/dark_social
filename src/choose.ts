import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { activationStrategy } from 'aurelia-router';

@autoinject
export class Choose {
	constructor(private router: Router) {
	}
	
	determineActivationStrategy = () => { activationStrategy.replace; }

	openProfile(name: number) {
		this.router.navigateToRoute("userprofile", { user_id: name }, 1);
	}
}