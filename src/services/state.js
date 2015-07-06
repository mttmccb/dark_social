export class State {
	constructor() {
		this.user_id = null || localStorage.getItem('user_id');
		this.token = null || localStorage.getItem('access_token');
		this.tokenReturned = null;			
	}

	use_idChanged(newValue) {
		localStorage.set('user_id',newValue);
	}

	tokenChanged(newValue) {
		localStorage.set('access_token',newValue);
	}
}