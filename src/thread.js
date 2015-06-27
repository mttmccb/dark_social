import { inject } from 'aurelia-framework';
import { AdnAPI } from 'services/adn-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PostPosted } from 'resources/messages';
import { findIndexByKeyValue } from 'resources/utility';

@inject(AdnAPI, EventAggregator)
export class Thread {

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;
		this.postPosted = ea.subscribe(PostPosted, msg => this.loadStream(this.id));
	}

	activate(params, query, route) {
		return this.loadStream(params.id);
	}

	deactivate() {
		this.postPosted();
	}

	loadStream(id) {
		this.id = id;
		return this.api.load('thread', { count: 200, more: false, id: id }).then(posts => {
			var threadedPost = posts.reverse();
			threadedPost.forEach((element, index, array) => {
				element.thread = true;
				if (index===0) {
					element.indent = 0;
				} else {
					var parentId = findIndexByKeyValue(array, 'id', element.reply_to);
					
					if (parentId !==-1) {
						var parentLevel = array[parentId].indent;
						element.indent = parentLevel + 2;
					}
				}
			});
			console.log(treeify(threadedPost));
						
			this.posts = treeify(threadedPost);
		});
	}
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function treeify(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'reply_to';
    if (!childrenAttr) childrenAttr = 'children';

    var treeList = [];
    var lookup = {};
    list.forEach(function(obj) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
    });
    list.forEach(function(obj) {
        if (obj[parentAttr] != null) {
            lookup[obj[parentAttr]][childrenAttr].push(obj);
        } else {
            treeList.push(obj);
        }
    });
    return treeList;
};