export class State {
	user_id = null || localStorage.getItem('user_id');
	token = null || localStorage.getItem('access_token');
	tokenReturned = null;	

	use_idChanged(newValue) {
		localStorage.set('user_id',newValue);
	}

	tokenChanged(newValue) {
		localStorage.set('access_token',newValue);
	}
}