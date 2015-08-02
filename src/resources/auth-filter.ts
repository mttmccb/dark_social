export class AuthFilterValueConverter {
  toView(routes: any, isLoggedIn: boolean) {
    if (isLoggedIn)
      return routes;
    return routes.filter((r: any) => !r.config.auth);
  }
}