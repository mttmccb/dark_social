import { ProfileRoute } from '../../resources/profile-route';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class FollowingProfiles {
  @bindable profiles: any = null;
  
	constructor(private profileRoute: ProfileRoute) { }
}