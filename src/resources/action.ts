export class ActionValueConverter {
  toView(value: string){
    let action = {
      'reply': 'replied to your post',
      'star': 'starred your post',
      'follow': 'starting following you',
      'repost': 'reposted your post'
    };
    return action[value];
  }
}