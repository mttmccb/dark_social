import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { State } from '../services/state';
import { ProfileRoute } from './profile-route';

@autoinject
export class PostClicks {
  constructor(private router: Router, private state: State, private profileRoute: ProfileRoute) { }

	openHashtag(hashtag: string) {
		this.router.navigateToRoute("hashtag", {hashtag: hashtag});  
	}

  handler(e: MouseEvent) {
    let node: Element = <Element>e.target;
    let nodeType: string = node.getAttribute('itemprop');

    if (nodeType === 'mention') {
      let mentionName: number = Number(node.getAttribute('data-mention-id'));
      this.profileRoute.openProfile(mentionName);

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