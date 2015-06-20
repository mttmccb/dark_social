export class ActionValueConverter {
  toView(value){
    let action = {
      'reply': 'You reply to',
      'star': 'You starred a post by',
      'follow': 'starting following you',
      'repost': 'You reposted as post by'
    };
    return action[value];
  }
}