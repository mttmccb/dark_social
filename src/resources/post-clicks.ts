import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { State } from '../services/state';

@autoinject
export class PostClicks {
  constructor(private router: Router, private state: State) {
    this.router = router;
    this.state = state;
  }

	openProfile(name: number) {
    this.state.user_id = name;
		this.router.navigateToRoute("userprofile", {user_id: name});  
	}

	openHashtag(hashtag: string) {
		this.router.navigateToRoute("hashtag", {hashtag: hashtag});  
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