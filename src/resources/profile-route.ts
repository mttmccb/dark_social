import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { State } from '../services/state';

@autoinject
export class ProfileRoute {
	constructor(private router: Router, private state: State) { }
	
	openProfile(name: number) { 
		this.router.navigateToRoute("userprofile", { user_id: name }); 
	}	
}