import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Choose {

	constructor(router, postclicks) {
		this.theRouter = router;
	}
	
	openProfile(name) {
		this.theRouter.navigateToRoute("userprofile", {user_id: name});  
	}
	
	navigate(e) {
		switch (e.target.value) {
			case "profile/random":
			case "trending":
			case "photos":
			case "conversations":
			case "checkins":
				this.theRouter.navigate(e.target.value);
				break;

			case "kebab":
				window.location.href = "http://en.wikipedia.org/wiki/Kebab";
				break;

			default:
				break;
		}
	}
}