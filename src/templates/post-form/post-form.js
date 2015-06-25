import { Validation } from 'aurelia-validation';
import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply, PostPosted, ApiStatus } from 'resources/messages';
import { State } from 'services/state';

@inject(AdnAPI, Validation, EventAggregator, State)
export class PostFormCustomElement {
	@bindable post = null;

	constructor(api, validation, ea, state) {
		this.api = api;
		this.validation = validation.on(this)
			.ensure('postText')
			.isNotEmpty()
			.hasMinLength(1)
			.passes(
			(newValue) => {
				return this.postText.replace(/([^"])(https?:\/\/([^\s"]+))/g, '').replace('[', '').replace(']', '').length <= 256;
			});
		this.ea = ea;
		this.state = state;
	}

	editPost = false;
	postText = '';
	lastPost = '';
	matchedMentions = [];
	mentionSearch = false;
	showPostPreview = false;
	showLastPost = false;

	get hasFocus() {
		return this.editPost;
	}
	set hasFocus(newValue) {
		this.editPost = newValue;
	}

	get postLength() {
		return this.postText.replace(/([^"])(https?:\/\/([^\s"]+))/g, '').replace('[', '').replace(']', '').length;
	}

	attached() {
		this.setupReply(this.postdata);
		return this.api.getAllUsers().then(data => {
			this.allUsers = data;
		});
	}
	
	submit(id) {
		this.validation.validate().then(() => {
			this.api.createPost(this.postText,(id ? { reply_to: id } : {})).then(data => {
				this.lastPost = data;
				this.showLastPost = true;
				this.postText = '';
				this.showPostPreview = false;
				this.ea.publish(new PostPosted());
			});
		}).catch(() => {
			this.ea.publish(new ApiStatus('Something went wrong... :(', { status: 'error' }));
		});
	}

	preview(id) {
		this.validation.validate().then(() => {
			this.api.textProcess(this.postText).then(data => {
				this.showPostPreview = true;
				this.postPreview = data;
			});
		}).catch(() => {
			this.ea.publish(new ApiStatus('Something went wrong... :(', { status: 'error' }));
		});
	}

	keyUp(e) {
		var regExp = /@[^ \W]*$/;
		var match = regExp.exec(this.postText);
		if (match !== null && match[0].length > 3) {
			this.mentionSearch = true;
			var fragment = match[0].replace('@', '');

			this.matchedMentions = [].filter.call(this.allUsers, function (item) {
				return typeof item.name == 'string' && item.name.indexOf(fragment) > -1;
			}).sort(function (a, b) {
				if (a.rank < b.rank) return 1;
				if (a.rank > b.rank) return -1;
				return 0;
			}).slice(0, 5);
		} else {
			this.mentionSearch = false;
		}
		return true;
	}

	keyDown(e) {
		var KEY_DOWNARROW = 40;
		if (this.mentionSearch && e.keyCode === KEY_DOWNARROW) {
			this.postText = this.postText.replace(/@[^ \W]*$/, `@${this.matchedMentions[0].name} `);
		}
		return true;
	}
	
	postChanged(newValue) {
		this.postdata = newValue;
	}

	setupReply(post) {
		if (post) {
			post = !post.repost_of? post : post.repost_of;
			
			var loggedInUser = null || this.state.tokenReturned.user;
			var postUser = null || post.user;
			this.replyTo = post.id;
			var mentionText = post.entities.mentions.map((mention) => {
				return '@' + mention.name;
				
			}).filter((v, i, a) => {
				return a.indexOf(v) == i;
				
			}).filter((mention) => {
				return mention !== `@${loggedInUser.username}`;
				
			}).join(' ');
			
			if (postUser.id !== loggedInUser.id) {
				mentionText = `@${postUser.username} ` + mentionText;	
			}
			
			this.postText = mentionText.length > 0 ? mentionText + ' ' : '';			
		}
		this.hasFocus = true;
	}
}