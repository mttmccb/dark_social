export class AuthFilterValueConverter {
  toView(routes, isLoggedIn) {
    if (isLoggedIn)
      return routes;
    return routes.filter(r => !r.config.auth);
  }
}