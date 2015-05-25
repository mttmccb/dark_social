import { findIndexByKeyValue } from './utility';

export class ObjectPropertyFrequencyValueConverter {
  toView(array, object, property) {
    var mentionMap = [];
    if (array.length>0) {
      mentionMap.push({name: array[0][object][property], count: 0});
      array.forEach((mention) => {
        var index = findIndexByKeyValue(mentionMap,'name',mention[object][property]);
        index ===-1?
          mentionMap.push({ name: mention[object][property], count: 1}) :
          mentionMap[index].count++;        
      });
    }
    return mentionMap;
  }
}