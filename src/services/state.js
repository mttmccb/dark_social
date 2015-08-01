export class State {
	constructor() {
		this.user_id = null;
		this.token = null || localStorage.getItem('access_token');
		this.tokenReturned = null;			
	}

	tokenChanged(newValue) {
		localStorage.set('access_token',newValue);
	}
}