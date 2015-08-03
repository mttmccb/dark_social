import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LoadMore, ApiStatus } from '../resources/messages';

@autoinject
export class GetMore {
	constructor(private ea: EventAggregator) {
	}

	getSomeMore() {
		this.ea.publish(new ApiStatus(`Retrieving More`, { status: 'info' }));
		this.ea.publish(new LoadMore());
	}
}