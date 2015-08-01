import { ApiStatus } from '../resources/messages';

export class UsersModel {
	constructor() {
		this.users = [];
		this.more = false;
	}

	addUsers(newUsers) {
		this.usersDataIsUnchanged(newUsers) ?
			this.ea.publish(new ApiStatus(`No New Users`, { status: 'info' })) :
			this.users = this.more ? this.users.concat(newUsers) : newUsers;
	}

	usersDataIsUnchanged(users) {
		return this.users.length > 0 && this.users[0].id === users[0].id;
	}
}