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
			.hasMinLength(1)
			.passes(
	          (newValue) => {
	            return this.postText.replace(/([^"])(https?:\/\/([^\s"]+))/g, '').replace('[', '').replace(']', '').length <=256;
	          }
	        );
		this.chainPosts = false;
	}

	editPost = false;
	postText = "";
	lastPost = "";
	matchedMentions = [];
	mentionSearch = false;

	get hasFocus() {
		return this.editPost;
	}
	set hasFocus(newValue) {
		this.editPost = newValue;
	}

	get postLength() {
		return this.postText.replace(/([^"])(https?:\/\/([^\s"]+))/g, '').replace('[', '').replace(']', '').length;
	}

	previousValue = this.postText;

	activate() {
		return this.loadLastPost();
	}

	loadLastPost() {
		return this.api.loadLastPost().then(data => {
			this.posts = data;
			this.lastPost = data[0];
			this.api.getAllUsers().then(data => {
				this.allUsers = data;
			});
		});
	}

	preview() {
		this.previousValue = this.postText;
		this.validation.validate().then(() => {
			this.api.textProcess(this.postText).then(data => {
				this.postPreview = data;
			});
		}).catch(() => {
			alert("Wrong");
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
				this.lastPost = data;
				this.postText = "";
				this.previousValue = "";
				this.loadLastPost();
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