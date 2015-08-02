import { findIndexByKeyValue } from './utility';

export class ObjectPropertyFrequencyValueConverter {
  toView(array: any[], object: string, property: string, additionalProperty: string) {
    var mentionMap: any[] = [];
    if (array.length > 0) {
      if (array[0][object]) {
        var item: any = { name: array[0][object][property], count: 0 };
        if (additionalProperty) {
          item[additionalProperty] = array[0][object][additionalProperty];
        }
        mentionMap.push(item);
        array.forEach((mention) => {
          var index: number = findIndexByKeyValue(mentionMap, 'name', mention[object][property]);
          if (index === -1) {
            item = { name: mention[object][property], count: 1 };
            if (additionalProperty) {
              item[additionalProperty] = mention[object][additionalProperty];
            }
            mentionMap.push(item);
          } else {
            mentionMap[index].count++;
          }
        });
      }
    }
    return mentionMap;
  }
}