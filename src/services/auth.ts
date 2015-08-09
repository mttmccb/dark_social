import { Redirect } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { AdnAPI } from './adn-api';
import { State } from './state';

class User {
  public id: number;
  public followingLimit: number;
  
  constructor(user: any) {
    this.id = user.user ? user.user.id: '';
    this.followingLimit = user.limits.following ? user.limits.following : null;
  }
}

@autoinject
export class AuthenticationService {
  constructor(private api: AdnAPI, private state: State) {
  }

  checkLogin() {
    return this.api.getToken(this.state.token)
      .then((tokenUser) => new User(tokenUser))
      .catch(() => new User({ user: null, limits: { following: 0}}));
  }

  handleLogin(accessToken: any) {
    return this.api.getToken(accessToken).then((tokenUser) => {
      localStorage.setItem("access_token",accessToken);
      this.state.tokenReturned = accessToken;
      return tokenUser;
    });
  }

  login() {
    window.location = "https://account.app.net/oauth/authorize?client_id=8uquHpRU2YLLB2vHHPkQXqa3tejYwDPC&response_type=token&redirect_uri=http://localhost:9000/handle_oauth?&scope=basic stream write_post follow update_profile public_messages messages files";
  }

  logout() {
    this.state.token = null;
    this.state.tokenReturned = null;
    localStorage.removeItem("access_token");
  }
}