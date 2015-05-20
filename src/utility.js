export function areEqual(obj1, obj2) {
	return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
}


export function parseDate(dateToParse) {
  return Math.round(( new Date() - Date.parse(dateToParse) ) /3600000);
}

export function findIndexByKeyValue(arraytosearch, key, valuetosearch) {
 
  for (var i = 0; i < arraytosearch.length; i++) {
   
    if (arraytosearch[i][key] == valuetosearch) {
      return i;
    }
  }
  return -1;
}

export function sortDescending(data) {
  return data.sort((a, b) => {
    if (a.count > b.count) { return -1; }
    if (a.count < b.count) { return 1; }
    return 0;
  });
}
  
export function take(data, count) {
  return data.splice(0,count);
}

export function sumKey(data, key) {
  return data.reduce((a, b) => a + b[key], 0)
}
