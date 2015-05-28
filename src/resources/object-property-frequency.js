import { findIndexByKeyValue } from './utility';

export class ObjectPropertyFrequencyValueConverter {
  toView(array, object, property,additionalProperty) {
    var mentionMap = [];
    if (array.length>0) {
      var item = {name: array[0][object][property], count: 0};
      if (additionalProperty) {
        item[additionalProperty] = array[0][object][additionalProperty];
      }
      mentionMap.push(item);
      array.forEach((mention) => {
        var index = findIndexByKeyValue(mentionMap,'name',mention[object][property]);
        if (index ===-1) {
          item = {name: mention[object][property], count: 1};
          if (additionalProperty) {
            item[additionalProperty] = mention[object][additionalProperty];
          }          
          mentionMap.push(item);
        } else {          
          mentionMap[index].count++;        
        }
      });
    }
    return mentionMap;
  }
}