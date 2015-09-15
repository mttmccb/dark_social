import { ProfileRoute } from '../../resources/profile-route';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class TopMentionsCustomElement {
  @bindable posts: any = null;

  constructor(private profileRoute: ProfileRoute) { }
}