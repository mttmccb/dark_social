import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoadMore, ApiStatus } from '../resources/messages';

@autoinject
export class GetMore {
	ea: EventAggregator;
	constructor(ea: EventAggregator) {
		this.ea = ea;
	}

	getSomeMore() {
		this.ea.publish(new ApiStatus(`Retrieving More`, { status: 'info' }));
		this.ea.publish(new LoadMore());
	}
}