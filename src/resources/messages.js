export class ImageViewed {
  constructor(image){
    this.image = image;
  }
}

export class LoggedIn {
  constructor(loggedin){
    this.loggedin = loggedin;
  }
}

export class ApiStatus {
  constructor(message, options){
    this.message = message;
    this.options = options;
  }
}

export class PostReply {
  constructor(post) {
    this.post = post;
  }
}

export class PostPosted {}

export class NewPost {}

export class GetRandomUser {}

export class RefreshView {}

export class LoadMore {}

export class StopAutoRefresh {}