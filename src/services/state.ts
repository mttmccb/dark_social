export class State {
	user_id: number;
	token: string;
	tokenReturned: any;
	constructor() {
		this.user_id = null;
		this.token = null || localStorage.getItem('access_token');
		this.tokenReturned = null;
	}

	tokenChanged(newValue: string) {
		localStorage.setItem('access_token', newValue);
	}
}