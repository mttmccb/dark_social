import { Validation } from 'aurelia-validation';
import { autoinject, bindable } from 'aurelia-framework';
import { AdnAPI } from '../../services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply, PostPosted, ApiStatus, StopAutoRefresh } from '../../resources/messages';
import { State } from '../../services/state';

@autoinject
export class PostFormCustomElement {
	@bindable post: any = { data: null, reply: false };
	submitting: boolean;
	editPost: boolean;
	postText: string;
	lastPost: string;
	matchedMentions: any[];
	mentionSearch: boolean;
	showPostPreview: boolean;
	showLastPost: boolean;
	postdata: any;
	replyTo: any;
	postPreview: any;
	isReply: boolean;
	allUsers: any;
	constructor(private api: AdnAPI, private validation: Validation, private ea: EventAggregator, private state: State) {
		this.api = api;
		this.validation = validation.on(this)
			.ensure('postText')
			.isNotEmpty()
			.hasMinLength(1)
			.passes(
			(newValue: any) => {
				return this.postText.replace(/([^"])(https?:\/\/([^\s"]+))/g, '').replace('[', '').replace(']', '').length <= 256;
			});
		this.ea = ea;
		this.state = state;
		this.submitting = false;
		this.editPost = false;
		this.postText = '';
		this.lastPost = '';
		this.matchedMentions = [];
		this.mentionSearch = false;
		this.showPostPreview = false;
		this.showLastPost = false;
	}

	set hasFocus(newValue) {
		this.editPost = newValue;
	}
	get hasFocus() {
		return this.editPost;
	}

	get postLength() {
		return this.postText.replace(/([^"])(https?:\/\/([^\s"]+))/g, '').replace('[', '').replace(']', '').length;
	}

	attached() {
		this.setupReply(this.postdata);
		return this.api.getAllUsers().then((data:any)=> {
			this.allUsers = data;
			if (!this.isReply) {
				this.api.loadLastPost().then(data => {
					this.lastPost = data[0];
					this.showLastPost = true;
					console.log(data[0]);
				}).catch(() => {
					this.showLastPost = false;
				});
			} else {
				this.showLastPost = false;
			}
		});
	}

	submit(id: number) {
		this.submitting = true;
		this.validation.validate().then(() => {
			this.api.createPost(this.postText,(id ? { reply_to: id } : {})).then((data: any) => {
				this.submitting = false;
				this.lastPost = data;
				this.resetPost();
				this.ea.publish(new PostPosted());
			});
		}).catch(() => {
			this.submitting = false;
			this.ea.publish(new ApiStatus('Something went wrong... :(', { status: 'error' }));
		});
	}

	resetPost() {
		this.showLastPost = true;
		this.postText = '';
		this.replyTo = null;
		this.showPostPreview = false;
	}

	preview(id: number) {
		this.validation.validate().then(() => {
			this.api.textProcess(this.postText).then((data: any) => {
				this.showPostPreview = true;
				this.postPreview = data;
			});
		}).catch(() => {
			this.ea.publish(new ApiStatus('Something went wrong... :(', { status: 'error' }));
		});
	}

	keyUp(e: KeyboardEvent) {
		var regExp = /@[^ \W]*$/;
		var match = regExp.exec(this.postText);
		if (match !== null && match[0].length > 3) {
			this.mentionSearch = true;
			var fragment = match[0].replace('@', '');

			this.matchedMentions = [].filter.call(this.allUsers, function (item: any) {
				return typeof item.name == 'string' && item.name.indexOf(fragment) > -1;
			}).sort(function (a: any, b: any) {
				if (a.rank < b.rank) return 1;
				if (a.rank > b.rank) return -1;
				return 0;
			}).slice(0, 5);
		} else {
			this.mentionSearch = false;
		}
		return true;
	}

	keyDown(e: KeyboardEvent) {
		var KEY_DOWNARROW = 40;
		if (this.mentionSearch && e.keyCode === KEY_DOWNARROW) {
			this.postText = this.postText.replace(/@[^ \W]*$/, `@${this.matchedMentions[0].name} `);
		}
		return true;
	}

	postChanged(newValue: any) {
		this.postdata = newValue.data;
		this.isReply = newValue.isReply;
	}

	setupReply(post: any) {
		this.ea.publish(new StopAutoRefresh());
		if (post) {
			post = !post.repost_of ? post : post.repost_of;

			var loggedInUser = null || this.state.tokenReturned.user;
			var postUser = null || post.user;
			this.replyTo = post.id;
			var mentionText = post.entities.mentions.map((mention: any) => {
				return `@${mention.name}`;

			}).filter((v: any, i: any, a: any) => {
				return a.indexOf(v) == i;

			}).filter((mention: any) => {
				return mention !== `@${loggedInUser.username}`;

			}).join(' ');

			if (postUser.id !== loggedInUser.id) {
				mentionText = `@${postUser.username} ` + mentionText;
			}

			this.postText = mentionText.length > 0 ? `${mentionText.trim()} ` : '';
		}
		this.hasFocus = true;
	}
}