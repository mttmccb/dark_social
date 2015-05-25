export class ReduceArrayValueConverter {
  toView(array, entityName) {
    return array.reduce(function(a, b) { return a.concat(b[entityName]); }, []); 
  }
}