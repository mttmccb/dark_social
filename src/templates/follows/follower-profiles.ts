import { ProfileRoute } from '../../resources/profile-route';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class FollowerProfiles {
  @bindable profiles: any = null;
  
	constructor(private profileRoute: ProfileRoute) { }
}