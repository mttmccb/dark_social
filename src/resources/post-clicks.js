import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { State } from 'services/state';

@inject(Router, State)
export class PostClicks {
  constructor(router, state) {
    this.theRouter = router;
    this.state = state;
  }

	openProfile(name) {
    this.state.user_id = name;
		this.theRouter.navigateToRoute("userprofile", {user_id: name});  
	}

  handler(e) {
    let node = e.target;
    let nodeType = node.getAttribute('itemprop');

    if (nodeType === 'mention') {
      let mentionName = node.getAttribute('data-mention-id');
      this.openProfile(mentionName);

    } else if (nodeType === 'hashtag') {
      let hashtagName = node.getAttribute('data-hashtag-name');
      window.location.href = `http://alpha.app.net/hashtags/${hashtagName}`;
    }

    if (node.tagName==="A") {
      node.setAttribute("target","_blank");
    }
    return true;
  }
}