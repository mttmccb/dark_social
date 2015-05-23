import { Router } from 'aurelia-router';

export class Choose {
	static inject() { return [Router]; }

	constructor(router) {
		this.theRouter = router;
	}

	navigate(e) {
		switch (e.target.value) {
			case "1":
				this.theRouter.navigate("profile");
				break;

			case "2":
				this.theRouter.navigate("trending");
				break;

			case "7":
				window.location.href = "http://en.wikipedia.org/wiki/Kebab"
				break;

			default:
				break;
		}
	}
}