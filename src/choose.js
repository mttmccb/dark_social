import { Router } from 'aurelia-router';
import { PostClicks } from '../resources/post-clicks';

export class Choose {
	static inject() { return [Router, PostClicks]; }

	constructor(router, postclicks) {
		this.theRouter = router;
		this.postclicks = postclicks;
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