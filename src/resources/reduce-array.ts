export class ReduceArrayValueConverter {
  toView(array: any[], entityName: string) {
    return array.reduce((a, b) => { return a.concat(b[entityName]); }, []); 
  }
}