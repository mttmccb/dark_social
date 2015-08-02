import { inject } from 'aurelia-framework';
import { ApiStatus } from '../resources/messages';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class UsersModel {
	users: any[] = 	[];
	more: boolean = false;
	ea: EventAggregator;

	addUsers(newUsers: any[]) {
		this.usersDataIsUnchanged(newUsers) ?
			this.ea.publish(new ApiStatus(`No New Users`, { status: 'info' })) :
			this.users = this.more ? this.users.concat(newUsers) : newUsers;
	}

	usersDataIsUnchanged(users: any[]) {
		return this.users.length > 0 && this.users[0].id === users[0].id;
	}
}