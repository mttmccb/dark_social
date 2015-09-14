import { autoinject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AdnAPI } from '../../services/adn-api';
import { State } from '../../services/state';

@autoinject
export class PostBackCustomElement {
  @bindable post: any;

  constructor(private router: Router, private api: AdnAPI, private state: State, private reported: boolean) {
    this.reported = false;
  }

  loadUserRoute(user: number) { this.router.navigateToRoute("userprofile", { user_id: user }); }

  reportPost(post: any) {
    return this.api.reportPost(post.id)
      .then(() => {
        this.reported = true;
      });
  }
}