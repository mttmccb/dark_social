export class ReduceArrayValueConverter {
  toView(array: any[], entityName: string) {
    return array.reduce(function(a, b) { return a.concat(b[entityName]); }, []); 
  }
}