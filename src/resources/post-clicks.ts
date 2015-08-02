import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { State } from '../services/state';

@inject(Router, State)
export class PostClicks {
  theRouter: Router;
  state: State;
  constructor(router: Router, state: State) {
    this.theRouter = router;
    this.state = state;
  }

	openProfile(name: number) {
    this.state.user_id = name;
		this.theRouter.navigateToRoute("userprofile", {user_id: name});  
	}

	openHashtag(hashtag: string) {
		this.theRouter.navigateToRoute("hashtag", {hashtag: hashtag});  
	}

  handler(e: MouseEvent) {
    let node: Element = e.target;
    let nodeType: string = node.getAttribute('itemprop');

    if (nodeType === 'mention') {
      let mentionName: number = Number(node.getAttribute('data-mention-id'));
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