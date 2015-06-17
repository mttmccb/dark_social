import { Validation } from 'aurelia-validation';
import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';


@inject(AdnAPI, Validation)
export class NewPosts {

	constructor(api, validation) {
		this.api = api;
		this.validation = validation.on(this)
			.ensure('postText')
			.isNotEmpty()
			.hasLengthBetween(1, 255);
		this.chainPosts = false;
	}

	editPost = false;
	postText = "";
	lastPost = "";

	get hasFocus() {
		return this.editPost;
	}
	set hasFocus(newValue) {
		this.editPost = newValue;
	}

	previousValue = this.postText;

	activate() {
		return this.loadLastPost();
	}

	loadLastPost() {
		return this.api.loadLastPost().then(data => {
			this.lastPost = data[0];
		});
	}

	preview() {
		this.previousValue = this.postText;
		this.validation.validate().then(() => {
			this.api.textProcess(this.postText).then(data => {
				this.post = data;
			});
		}).catch(() => {
			alert("Wrong");
		});
	}

	setupReply(id) {
		if (this.chainPosts) {
			var mentionText = this.lastPost.entities.mentions.map((mention) => {
				return '@' + mention.name;
			}).filter((v, i, a) => {
				return a.indexOf(v) == i
			}).join(' ');
			if (mentionText.length > 0) {
				this.postText = mentionText + ' ';
			}
			this.replyTo = id;
			this.hasFocus = true;

		} else {
			this.replyTo = null;
		}
	}

	submit() {
		this.previousValue = this.postText;
		this.validation.validate().then(() => {
			this.api.createPost(this.postText,(this.replyTo ? { reply_to: this.replyTo } : {})).then(data => {
				this.post = data;
				this.postText = "";
				return this.loadLastPost();
			});
		}).catch(() => {
			alert("Wrong");
		});
	}

	canDeactivate() {
		if (this.postText !== this.previousValue) {
			return confirm('Are you sure you want to leave?');
		}
	}
}