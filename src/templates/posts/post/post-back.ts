import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AdnAPI } from '../../../services/adn-api';
import { State } from '../../../services/state';

@inject(Router, AdnAPI, State)
export class PostBackCustomElement {
  @bindable post: any = null;
  theRouter: Router;
  api: AdnAPI;
  state: State;
  reported: boolean;
  constructor(router: Router, api: AdnAPI, state: State) {
    this.theRouter = router;
    this.api = api;
    this.state = state;
    this.reported = false
  }

  loadUserRoute(user: number) {
    this.theRouter.navigateToRoute("userprofile", { user_id: user });
  }
  
  reportPost(post: any) {
		return this.api.reportPost(post.id).then(() => {
			this.reported = true;
		});
  }
}