import { inject } from 'aurelia-framework';
import { AuthenticationService } from '../../services/auth';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoggedIn } from 'resources/messages';
import { State } from '../services/state';

@inject(AuthenticationService, Router, EventAggregator, State)
export class HandleOAuth {

	constructor(authService, router, ea, state) {
		this.state = state;
		this.authService = authService;
		this.theRouter = router;
		this.ea = ea;
	}

	activate(params, queryString, routeConfig) {
		this.state.token = params.access_token;
		this.authService.handleLogin(params.access_token).then((token) => {
			this.theRouter.navigate("");
		    this.ea.publish(new LoggedIn(true));
		});
	}
}