import { inject } from 'aurelia-framework';
import { AdnAPI } from './services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted, RefreshView } from './resources/messages';
import { findIndexByKeyValue, treeify } from './resources/utility';

@inject(AdnAPI, EventAggregator)
export class Thread {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream(this.id));
		this.refreshView = ea.subscribe(RefreshView, msg => this.loadStream(this.id));
	}

	activate(params, query, route) {
		return this.loadStream(params.id);
	}

	deactivate() {
		this.postPosted();
		this.refreshView();
	}

	loadStream(id) {
		this.id = id;
		return this.api.load('thread', { count: 200, more: false, id: id }).then(posts => {
			var threadedPost = posts.reverse();
			threadedPost.forEach((element, index, array) => {
				element.thread = true;
				if (index===0) {
					element.indent = 0;
				} else {
					var parentId = findIndexByKeyValue(array, 'id', element.reply_to);
					
					if (parentId !==-1) {
						var parentLevel = array[parentId].indent;
						element.indent = parentLevel + 2;
					}
				}
			});
			this.posts = treeify(threadedPost);
		});
	}
}