import { autoinject } from 'aurelia-framework';
import { ApiStatus } from '../resources/messages';
import { findIndexByKeyValue, treeify } from '../resources/utility';
import { EventAggregator } from 'aurelia-event-aggregator';

@autoinject
export class PostsModel {
	private more: boolean;
	private showAvatars: boolean;
	private avatar: boolean; 
	private posts: any[];
	private streamid: number;
	
	constructor(private ea: EventAggregator) {
		this.posts = [];
		this.streamid = null;
		this.more = false;
		this.showAvatars = true;
		this.avatar = true;
	}

	addPosts(newPosts: any[]) {
		this.postsDataIsUnchanged(newPosts) ?
			this.ea.publish(new ApiStatus(`No New Posts`, { status: 'info' })) :
			this.posts = this.more ? this.posts.concat(newPosts) : newPosts;
	}

	threadPosts() {
		var threadedPost: any[] = this.posts.reverse();
		threadedPost.forEach((element, index, array) => {
			element.thread = true;
			if (index === 0) {
				element.indent = 0;
			} else {
				var parentId = findIndexByKeyValue(array, 'id', element.reply_to);

				if (parentId !== -1) {
					var parentLevel = array[parentId].indent;
					element.indent = parentLevel + 2;
				}
			}
		});
		this.posts = treeify(threadedPost);
	}

	postsDataIsUnchanged(posts: any[]) {
		return this.posts.length > 0 && this.posts[0].id === posts[0].id;
	}
}