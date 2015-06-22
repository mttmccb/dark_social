import { findIndexByKeyValue } from './utility';

export class PropertyFrequencyValueConverter {
  toView(array, property, additionalProperty) {
    var mentionMap = [];
    if (array.length > 0) {
      var item = { name: array[0][property], count: 0 };
      if (additionalProperty) {
        item[additionalProperty] = array[0][additionalProperty];
      }
      mentionMap.push(item);
      array.forEach((mention) => {
        var index = findIndexByKeyValue(mentionMap, 'name', mention[property]);
        if (index === -1) {
          item = { name: mention[property], count: 1 };
          if (additionalProperty) {
            item[additionalProperty] = array[0][additionalProperty];
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