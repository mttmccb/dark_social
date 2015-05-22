import { Router } from 'aurelia-router';

export class Choose {
	static inject() { return [Router]; }

	constructor(router) {
		this.theRouter = router;
	}

	navigate(e) {
		console.log(e);
		if (e.target.value==="1") {
			this.theRouter.navigate("profile");			
		}
	}
}