import { autoinject } from 'aurelia-framework';
import { AuthenticationService } from '../services/auth';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoggedIn } from '../resources/messages';
import { State } from '../services/state';

@autoinject
export class HandleOAuth {
	state: State;
	authService: AuthenticationService;
	ea: EventAggregator;
	theRouter: Router;
	constructor(authService: AuthenticationService, theRouter: Router, ea: EventAggregator, state: State) {
		this.authService = authService;
		this.theRouter = theRouter;
		this.state =state;
		this.ea = ea;
	}

	activate(params: any, queryString: any, routeConfig: any) {
		this.state.token = params.access_token;
		this.authService.handleLogin(params.access_token).then((token) => {
			this.theRouter.navigate("");
			this.ea.publish(new LoggedIn(true));
		});
	}
}