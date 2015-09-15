import { ProfileRoute } from '../../resources/profile-route';
import { autoinject, bindable } from 'aurelia-framework';
import { AdnAPI } from '../../services/adn-api';
import { State } from '../../services/state';

@autoinject
export class PostBackCustomElement {
  @bindable post: any;

  constructor(private profileRoute: ProfileRoute, private api: AdnAPI, private state: State, private reported: boolean) {
    this.reported = false;
  }

  reportPost(post: any) {
    return this.api.reportPost(post.id)
      .then(() => {
        this.reported = true;
      });
  }
}