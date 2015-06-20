import { Validation } from 'aurelia-validation';
import { inject, bindable } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostReply, PostPosted, ApiStatus } from 'resources/messages';

@inject(AdnAPI, Validation, EventAggregator)
export class PostFormCustomElement {
	@bindable post = null;

	constructor(api, validation, ea) {
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
		//ea.subscribe(PostReply, msg => this.setupReply(msg.post));
	}

	editPost = false;
	postText = '';
	lastPost = '';
	matchedMentions = [];
	mentionSearch = false;
	previousValue = this.postText;

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
	}
	
	submit(id) {
		this.previousValue = this.postText;
		this.validation.validate().then(() => {
			this.api.createPost(this.postText,(id ? { reply_to: id } : {})).then(data => {
				this.lastPost = data;
				this.postText = '';
				this.ea.publish(new PostPosted());
			});
		}).catch(() => {
			this.ea.publish(new ApiStatus('Something went wrong... :(', { status: 'error' }));
		});
	}

	preview(id) {
		this.previousValue = this.postText;
		this.validation.validate().then(() => {
			this.api.textProcess(this.postText).then(data => {
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
		this.replyTo = post.id;
		var mentionText = post.entities.mentions.map((mention) => {
			return '@' + mention.name;
		}).filter((v, i, a) => {
			return a.indexOf(v) == i;
		}).join(' ');
		this.postText = mentionText.length > 0 ? mentionText + ' ' : '';
		this.hasFocus = true;
	}
}