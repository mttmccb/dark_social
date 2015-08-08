export class ImageViewed {
  image: any;
  constructor(image: any){
    this.image = image;
  }
}

export class LoggedIn {
  loggedin: any;
  constructor(loggedin: any){
    this.loggedin = loggedin;
  }
}

export class ApiStatus {
  message: string;
  options: any;
  constructor(message: string, options: any){
    this.message = message;
    this.options = options;
  }
}

export class PostReply {
  post: any;
  constructor(post: any) {
    this.post = post;
  }
}

export class PostPosted {}

export class NewPost {}

export class GetRandomUser {}

export class RefreshView {}

export class RefreshedView {}

export class LoadMore {}

export class LoadUntilStreamMarker {}

export class StopAutoRefresh {}

export class StreamMarkerUpdated {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}