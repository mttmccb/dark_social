import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { RefreshView, ApiStatus, StopAutoRefresh } from '../resources/messages';

@autoinject
export class RefreshIndicator {
	_autorefresh: boolean;
	autorefreshon: any;
	
	constructor(private ea: EventAggregator) {
		this._autorefresh = false;
		ea.subscribe(StopAutoRefresh, (msg: any) => this._autorefresh = false);
	}

	refresh() {
		this.ea.publish(new RefreshView());
		this.ea.publish(new ApiStatus(`Refreshing`, { status: 'info' }));
	}

	detached() { clearInterval(this.autorefreshon); }

	get autorefresh() { return this._autorefresh; }
	
	set autorefresh(newValue: any) {
		this._autorefresh = newValue;

		newValue === true?
			this.autorefreshon = this.timedRefresh(30000) :
			clearInterval(this.autorefreshon);
	}

	timedRefresh = (t: number) => {
		setInterval(() => {
			this.refresh();
		}, t);
	}
}