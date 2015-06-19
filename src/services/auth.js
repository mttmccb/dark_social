import { Redirect } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';

class User {
  constructor(user) {
    this.username = user.user ? user.user.username: '';
    this.followingLimit = user.limits.following ? user.limits.following : null;
  }
}

@inject(AdnAPI)
export class AuthenticationService {

  constructor(api) {
    this.api = api;
  }

  checkLogin() {
    return this.api.getToken().then((tokenUser) => {
      return new User(tokenUser);
    }).catch(() => {
      return new User({ user: null, limits: { following: 0}});
    });
  }

  handleLogin(accessToken) {
    return this.api.getToken(accessToken).then((tokenUser) => {
      localStorage.setItem("access_token",accessToken);
      return tokenUser;
    });
  }

  login() {
    window.location = "https://account.app.net/oauth/authenticate?client_id=FR3e2MCDURqyfJKkFjWCanRqzfDmZUe9&response_type=token&redirect_uri=http://localhost:9000/handle_oauth?&scope=basic stream write_post follow update_profile public_messages messages files";
  }

  logout() {
    localStorage.removeItem("access_token");
  }
}