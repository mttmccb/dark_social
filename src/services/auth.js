import { Redirect } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';

let user = null;

class User {
  constructor(user) {
    this.username = user.user.username;
    this.followingLimit = user.limits.following? user.limits.following: null;
  }
}

@inject(AdnAPI)
export class AuthenticationService {
  
  constructor(api) {
    this.api = api;
  }
  
  get user() {
    return user;
  }

  checkLogin() {
    if (user === null)
      return Promise.resolve(null);

    return user;
  }
  
  handleLogin(accessToken) {
		localStorage.setItem('access_token', accessToken);
    return this.api.getToken(accessToken).then((tokenUser) => {
      console.log(tokenUser);
      user = new User(tokenUser);
    });
  }

  login() {
		window.location="https://account.app.net/oauth/authenticate?client_id=FR3e2MCDURqyfJKkFjWCanRqzfDmZUe9&response_type=token&redirect_uri=http://localhost:9000/handle_oauth?&scope=basic stream write_post follow update_profile public_messages messages files";
  }

  logout() {
    if (user === null) {
      return Promise.resolve(true);
    }

    user === null;
    localStorage.removeItem("access_token");
    return null;
  }
}

export class AuthorizeStep {
  static inject() { return [AuthenticationService]; }
  constructor(authenticationService) {
    this.auth = authenticationService;
    console.log("Authorize step construct");
  }

  run(routingContext, next) {
    const authRoutes = routingContext.nextInstructions.filter(i => i.config.auth);
    if (authRoutes.length === 0)
      return next();

    if (window.location.hash) {
      return next.cancel(new Redirect('handle_oauth?' + window.location.hash.substring(1)));
    }

    // Check that the user is logged in.
    return this.auth.checkLogin().then(user => {
      return true;
    }).then(authorized => {
      if (authorized)
        return next();

      return next.cancel(new Redirect('/login'));
    });
  }
}