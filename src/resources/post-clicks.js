import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { State } from '../services/state';

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

	openHashtag(hashtag) {
		this.theRouter.navigateToRoute("hashtag", {hashtag: hashtag});  
	}

  handler(e) {
    let node = e.target;
    let nodeType = node.getAttribute('itemprop');

    if (nodeType === 'mention') {
      let mentionName = node.getAttribute('data-mention-id');
      this.openProfile(mentionName);

    } else if (nodeType === 'hashtag') {
      let hashtagName = node.getAttribute('data-hashtag-name');
      this.openHashtag(hashtagName);
    }

    if (node.tagName==="A") {
      node.setAttribute("target","_blank");
    }
    return true;
  }
}