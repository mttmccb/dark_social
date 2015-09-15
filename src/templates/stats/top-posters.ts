import { ProfileRoute } from '../../resources/profile-route';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class TopPostersCustomElement {
  @bindable posts: any = null;

	constructor(private profileRoute: ProfileRoute) { }
}