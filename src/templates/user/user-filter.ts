import { autoinject, bindable } from 'aurelia-framework';
import { AdnAPI } from '../../services/adn-api';

@autoinject
export class UserFilter {
  @bindable user: any;
  
  constructor(private api: AdnAPI) {
  }
  
  toggleFollow(user: any, e: Event) {
    e.preventDefault();
    user.you_follow = !user.you_follow;
    this.api.toggleFollow(user, user.you_follow);
  }

  toggleMute(user: any, e: Event) {
    e.preventDefault();
    user.you_muted = !user.you_muted;
    this.api.toggleMute(user, user.you_muted);
  }

  toggleBlock(user: any, e: Event) {
    e.preventDefault();
    user.you_blocked = !user.you_blocked;
    this.api.toggleBlock(user, user.you_blocked);
  }	
}