import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoadMore, ApiStatus } from '../resources/messages';

@inject(EventAggregator)
export class GetMore {

	constructor(ea) {
		this.ea = ea;
	}

	getSomeMore() {
		this.ea.publish(new LoadMore());
		this.ea.publish(new ApiStatus(`Retrieving More`, { status: 'info' }));
	}
}