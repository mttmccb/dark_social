export class ReduceObjectValueConverter {
  toView(array: any[], object: string, entityName: string) {
    return array.reduce(function(a, b) { return a.concat(b[object][entityName]); }, []); 
  }
}