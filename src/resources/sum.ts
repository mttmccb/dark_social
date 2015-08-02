export class SumValueConverter {
  toView(array: any[], key: string) {
    return array.reduce((a, b) => a + b[key], 0);
  }
}