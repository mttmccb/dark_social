export class ReduceEntityValueConverter {
  toView(array, entityName) {
    return array.reduce(function(a, b) { return a.concat(b.entities[entityName]); }, []); 
  }
}