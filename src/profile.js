import { computedFrom, inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { parseDate, findIndexByKeyValue, sumKey } from './resources/utility';

@inject(AdnAPI)
export class Profile {
  constructor(api) {
    this.api = api;
  }

  loadPostsIntoData() {
    return this.api.loadPosts(this.user_id).then(data => {
      this.data = data;
      this.user_id = this.data[0].user.username;
    });
  }

  loadMorePosts() {
    return this.api.loadPosts(this.user_id, true).then(data => {
      this.data = this.data.concat(data);
    });
  }
  
  loadNewUser() {
    localStorage.setItem('user_id',this.user_id);
    return this.loadPostsIntoData();
  }

  loadMentionUser(user) {
    this.user_id = user.name;
    localStorage.setItem('user_id',user.name);
    return this.loadPostsIntoData();
  }
  
  randomize() {
    localStorage.removeItem('user_id');
    return this.loadPostsIntoData();    
  }
  
  activate() {
    return this.api.loadPosts(this.user_id).then(data => {
      this.data = data;
      this.user_id = this.data[0].user.username;
    });
  }
  
  numberOfTopMentions = 5;
  moreMentions() {
    this.numberOfTopMentions += 5;
  }
  
  //TODO: Refactor this to use promises to chain the 4 sections (reduce, count, sort, take x)
  @computedFrom('data')
  get mentionByUsername() {
    if (!this.data) { return [{ name: 'matt', count: 1}]; }
    
    let array = reduceToMentions(this.data);
    array = getMentionFrequency(array);
    return array;
  } 
    
  //TODO: Refactor this when I have hashtag viewing setup
  bioClicks(e) {
    let node = e.target;
		let nodeType = node.getAttribute('itemprop');
  	
		if (nodeType === 'mention') {
  		let mentionName = node.getAttribute('data-mention-name');
      this.loadMentionUser({name: mentionName});
      
		} else if (nodeType === 'hashtag') {
      let hashtagName = node.getAttribute('data-hashtag-name');
  		window.location.href = 'http://alpha.app.net/hashtags/' + hashtagName;
		}
    return true;
  }
  
  toggleDetails(e, post) {
    if (post.hidePost) {
      post.hidePost = false;
    } else {
      post.hidePost = true;
    }
  }
  
  showBanner = false;
  toggleVisible(e) {
    this.showBanner = !this.showBanner;
  }
  
  @computedFrom('post')
  get loadImages(){
    if (!this.post) {
      return [];
    }    
    return this.post.annotations;
  }
  
  getPost(id) {
    return this.api.loadPost(id).then(post => {
      this.post = post;
    });
  }
}

function reduceToMentions(data) {
  return data.reduce(function(a, b) { return a.concat(b.entities.mentions); }, []); 
}
  
function getMentionFrequency(data) {
  var mentionMap = [];
  if (data.length>0) {
    mentionMap.push({name: data[0].name, count: 0});
    
    data.forEach((mention) => {
      var index = findIndexByKeyValue(mentionMap,'name',mention.name);
      index ===-1?
        mentionMap.push({ name: mention.name, count: 1}) :
        mentionMap[index].count++;        
    });
  }
  return mentionMap;
}