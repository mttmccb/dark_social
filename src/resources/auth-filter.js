export class AuthFilterValueConverter {
  toView(routes, isLoggedIn) {
    console.log('authfilter: ' + isLoggedIn);
    if (isLoggedIn)
      return routes;
    return routes.filter(r => !r.config.auth);
  }
}