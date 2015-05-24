import { Router } from 'aurelia-router';

export class Choose {
	static inject() { return [Router]; }

	constructor(router) {
		this.theRouter = router;
	}

	openProfile(name) {
		localStorage.setItem('user_id', name);
		this.theRouter.navigate("profile");  
		// this.theRouter.navigateToRoute("profile", { user_id: name });  
	}

	navigate(e) {
		switch (e.target.value) {
			case "1":
				this.theRouter.navigate("profile");
				break;

			case "3":
				this.theRouter.navigate("trending");
				break;

			case "4":
				this.theRouter.navigate("photos");
				break;

			case "6":
				this.theRouter.navigate("checkins");
				break;

			case "8":
				this.theRouter.navigate("conversations");
				break;

			case "11":
				window.location.href = "http://en.wikipedia.org/wiki/Kebab";
				break;

			default:
				break;
		}
	}
}