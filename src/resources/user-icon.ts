export class UserIconValueConverter {
  toView(value: string){
    let icons: any = {
      'human': 'user',
      'feed': 'rss',
      'bot': 'meh-o',
      'snowman': 'user-secret'
    };
    if (!value) { return 'bot'; }
    return icons[value];
  }
}