import { findIndexByKeyValue } from './utility';

export class PropertyFrequencyValueConverter {
  toView(array: any[], property: string, additionalProperty: string) {
    var mentionMap: any[] = [];
    if (array.length > 0) {
      var item: any = { name: array[0][property], count: 0 };
      if (additionalProperty) {
        item[additionalProperty] = array[0][additionalProperty];
      }
      mentionMap.push(item);
      array.forEach((mention) => {
        var index: number = findIndexByKeyValue(mentionMap, 'name', mention[property]);
        if (index === -1) {
          item = { name: mention[property], count: 1 };
          if (additionalProperty) {
            item[additionalProperty] = mention[additionalProperty];
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