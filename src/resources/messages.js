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