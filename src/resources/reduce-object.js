export class ReduceObjectValueConverter {
  toView(array, object, entityName) {
    return array.reduce(function(a, b) { return a.concat(b[object][entityName]); }, []); 
  }
}