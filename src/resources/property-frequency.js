import { findIndexByKeyValue } from './utility';

export class PropertyFrequencyValueConverter {
  toView(array, property) {
    var mentionMap = [];
    if (array.length>0) {
      mentionMap.push({name: array[0][property], count: 0});
      
      array.forEach((mention) => {
        var index = findIndexByKeyValue(mentionMap,'name',mention[property]);
        index ===-1?
          mentionMap.push({ name: mention[property], count: 1}) :
          mentionMap[index].count++;        
      });
    }
    return mentionMap;
  }
}