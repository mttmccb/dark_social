export function areEqual(obj1: Object, obj2: Object) {
  return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
}

export function parseDate(dateToParse: string) {
  return Math.round((new Date() - Date.parse(dateToParse)) / 3600000);
}

export function findIndexByKeyValue(arraytosearch: any[], key: any, valuetosearch: any) {

  for (var i = 0; i < arraytosearch.length; i++) {

    if (arraytosearch[i][key] == valuetosearch) {
      return i;
    }
  }
  return -1;
}

export function randomInteger(max: number): number {
  return Math.floor((Math.random() * max) + 1);
}

export function treeify(list: any[], idAttr?: string, parentAttr?: string, childrenAttr?: string) {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'reply_to';
    if (!childrenAttr) childrenAttr = 'children';

    var treeList: any[] = [];
    var lookup = {};
    list.forEach(function(obj: any) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
    });
    list.forEach(function(obj: string) {
        if (obj[parentAttr] != null) {
            lookup[obj[parentAttr]][childrenAttr].push(obj);
        } else {
            treeList.push(obj);
        }
    });
    return treeList;
};