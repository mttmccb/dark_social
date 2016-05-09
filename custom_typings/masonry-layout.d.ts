declare module 'masonry-layout'{
	class Masonry{
		constructor(element:Element, params:Object);

		on(event:string, callback:Function);
	}

	export = Masonry;
}