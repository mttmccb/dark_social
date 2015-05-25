export class UserIconValueConverter {
  toView(value){
    let icons = {
      'human': 'user',
      'feed': 'rss',
      'bot': 'meh-o',
      'snowman': 'user-secret'
    };
    if (!value) { return 'bot'; }
    return icons[value];
  }
}