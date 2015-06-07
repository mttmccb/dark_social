import { inject } from 'aurelia-framework';
import { AuthenticationService } from '../../services/auth';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoggedIn } from 'resources/messages';

@inject(AuthenticationService, Router, EventAggregator)
export class HandleOAuth {

	constructor(authService, router, ea) {
		this.authService = authService;
		this.theRouter = router;
		this.ea = ea;
	}

	activate(params, queryString, routeConfig) {
		this.authService.handleLogin(params.access_token).then(() => {
			this.theRouter.navigate("");
		    this.ea.publish(new LoggedIn(true));
		});
	}
}