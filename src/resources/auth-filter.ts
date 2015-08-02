export class AuthFilterValueConverter {
  toView(routes, isLoggedIn: boolean) {
    if (isLoggedIn)
      return routes;
    return routes.filter(r => !r.config.auth);
  }
}