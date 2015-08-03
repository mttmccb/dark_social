import { autoinject } from 'aurelia-framework';
import { AuthenticationService } from '../services/auth';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoggedIn } from '../resources/messages';
import { State } from '../services/state';

@autoinject
export class HandleOAuth {
	constructor(private authService: AuthenticationService, private router: Router, private ea: EventAggregator, private state: State) {
	}

	activate(params: any, queryString: any, routeConfig: any) {
		this.state.token = params.access_token;
		this.authService.handleLogin(params.access_token).then((token) => {
			this.router.navigate("");
			this.ea.publish(new LoggedIn(true));
		});
	}
}