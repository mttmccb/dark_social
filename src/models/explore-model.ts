let clientList = [
	{ name: 'Prose', 
		platforms: ['iOS'],
		description: 'slick microblogging client',
		link: "http://prose-app.net",
		features: ['microblogging', 'trending'] },
	{ name: 'Favd',
		platforms: ['iOS'],
		description: 'photo sharing and discovery',
		link: "http://favd.net/",
		features: ['microblogging', 'photos', 'checkins'] },
	{ name: 'Sunlit',
		platforms: ['iOS'],
		description: 'photo focussed journal',
		link: "http://sunlit.io/",
		features: ['photos', 'checkins'] },
	{ name: 'Nice.Social',
		platforms: ['Web'],
		description: 'multi-stream microblogging',
		link: "http://nice.social/",
		features: ['photos', 'checkins', 'microblogging', 'conversations'] },
	{ name: 'ChatView',
		platforms: ['Web'],
		description: 'an IRC-like client',
		link: "http://chatview.adn.customwebapps.com",
		features: ['conversations'] },
	{ name: 'TreeView',
		platforms: ['Web'],
		description: 'thread viewing client',
		link: "http://treeview.us",
		features: ['conversations', 'microblogging'] },
	{ name: 'Chimp',
		platforms: ['iOS'],
		description: 'rich microblogging client',
		link: "http://chimp.li",
		features: ['conversations', 'microblogging'] },
	{ name: 'Ohai',
		platforms: ['iOS'],
		description: 'checkin focussed journal',
		link: "http://ohaiapp.net",
		features: ['checkins'] }
];

export class ExploreModel {
	endPoint: string;
	
	constructor(endPoint: string) {
		this.endPoint = endPoint;
	}
	
	get title() {
		return `${this.endPoint.charAt(0).toUpperCase()}${this.endPoint.substr(1).toLowerCase()}`;
	}

	getClients() {
		return clientList.filter((a) => {
			return a.features.indexOf(this.endPoint) !== -1;
		});
	}
}
