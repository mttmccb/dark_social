import { ApiStatus } from '../resources/messages';

export class PostsModel {
	constructor() {
		this.posts = [];
		this.streamid = null;
		this.more = false;
		this.showAvatars = true;
		this.avatar = true;
	}

	addPosts(newPosts) {
		if (this.postsDataIsUnchanged(newPosts)) {
			this.ea.publish(new ApiStatus(`No New Posts`, { status: 'info' }));
		} else {
			this.posts = this.more ? this.posts.concat(newPosts) : newPosts;
		}
	}

	postsDataIsUnchanged(posts) {
		return this.posts.length > 0 && this.posts[0].id === posts[0].id;
	}
}