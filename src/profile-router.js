export class ProfileRouter {
	heading = 'Profile';

	configureRouter(config, router) {
		config.map([
			//{ route: ['', 'profile'], name: 'profile', moduleId: './profile', nav: true, title: 'Profile' },
			{ route: ['','posts'], name: 'posts', moduleId: './profile/profile-posts', nav: true },
			{ route: 'followers', name: 'followers', moduleId: './profile/followers', nav: true },
			{ route: 'following', name: 'following', moduleId: './profile/following', nav: true },
			{ route: 'stars', name: 'stars', moduleId: './profile/stars', nav: true }
		]);

		this.router = router;
	}
}