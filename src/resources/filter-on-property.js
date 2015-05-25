export class FilterOnPropertyValueConverter {
  toView(array: {}[], property: string, exp: string) {

    if (array === undefined || array === null || property === undefined || exp === undefined) {
      return array;
    }
    return array.filter((item) => item[property].toLowerCase().indexOf(exp.toLowerCase()) > -1);
  }
}