export class State {
	public user_id: number;
	public token: string;
	public tokenReturned: any;
	
	constructor() {
		this.user_id = null;
		this.token = null || localStorage.getItem('access_token');
		this.tokenReturned = null;
	}

	tokenChanged(newValue: string) {
		localStorage.setItem('access_token', newValue);
	}
}