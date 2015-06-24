import { Redirect } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { State } from './state';

class User {
  constructor(user) {
    this.id = user.user ? user.user.id: '';
    this.followingLimit = user.limits.following ? user.limits.following : null;
  }
}

@inject(AdnAPI, State)
export class AuthenticationService {

  constructor(api, state) {
    this.api = api;
    this.state = state;
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
    window.location = "https://account.app.net/oauth/authenticate?client_id=8uquHpRU2YLLB2vHHPkQXqa3tejYwDPC&response_type=token&redirect_uri=http://localhost:9000/handle_oauth?&scope=basic stream write_post follow update_profile public_messages messages files";
  }

  logout() {
    this.state.token = null;
    this.state.tokenReturned = null;
    localStorage.removeItem("access_token");
  }
}