export class SumValueConverter {
  toView(array, key) {
    return array.reduce((a, b) => a + b[key], 0);
  }
}