export function areEqual(obj1, obj2) {
	return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
}


export function parseDate(dateToParse) {
  return Math.round(( new Date() - Date.parse(dateToParse) ) /3600000);
}

export function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
 
  for (var i = 0; i < arraytosearch.length; i++) {
   
    if (arraytosearch[i][key] == valuetosearch) {
      return i;
    }
  }
  return -1;
}