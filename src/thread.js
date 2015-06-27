import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';
import { findIndexByKeyValue } from 'resources/utility';

@inject(AdnAPI, EventAggregator)
export class Thread {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream());
	}

	activate(params, query, route) {
		return this.loadStream(params.id);
	}

	deactivate() {
		this.postPosted();
	}

	loadStream(id) {
		return this.api.load('thread', { more: false, id: id }).then(posts => {
			var threadedPost = posts.reverse();
			threadedPost.forEach((element, index, array) => {
				if (index===0) {
					element.indent = 0;					
				} else {
					var parentId = findIndexByKeyValue(array, 'id', element.reply_to);
					
					if (parentId !==-1) {
						var parentLevel = array[parentId].indent;
						console.log(parentLevel);
						element.indent = parentLevel + 2;	
						console.log(element.indent);					
					}
				}
			});
			
			this.posts = threadedPost;
			console.log(this.posts);
		});
	}
}