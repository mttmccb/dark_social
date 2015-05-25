import { Router } from 'aurelia-router';

export class PostClicks {
  static inject() { return [Router]; }

  constructor(router) {
    this.theRouter = router;
  }

	openProfile(name) {
		localStorage.setItem('user_id', name);
		this.theRouter.navigate("profile");  
	}

  handler(e) {
    let node = e.target;
    let nodeType = node.getAttribute('itemprop');

    if (nodeType === 'mention') {
      let mentionName = node.getAttribute('data-mention-name');
      this.openProfile(mentionName);

    } else if (nodeType === 'hashtag') {
      let hashtagName = node.getAttribute('data-hashtag-name');
      window.location.href = 'http://alpha.app.net/hashtags/' + hashtagName;
    }
    return true;
  }
}