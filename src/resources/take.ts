export class TakeValueConverter {
  toView(array: any[], count: number) {
    return array.slice(0, count);
  }
}