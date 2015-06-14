import { Validation } from 'aurelia-validation';
import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';


@inject(AdnAPI, Validation)
export class NewPost {

	constructor(api, validation) {
		this.api = api;
		this.validation = validation.on(this)
			.ensure('postText')
			.isNotEmpty()
			.hasLengthBetween(1, 255);
	}

	postText = "";

	previousValue = this.postText;

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

	submit() {
		this.previousValue = this.postText;
		this.validation.validate().then(() => {
			this.api.createPost(this.postText).then(data => {
				this.post = data;
				this.postText = "";
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