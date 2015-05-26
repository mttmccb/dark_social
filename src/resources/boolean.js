
export class BooleanValueConverter {
  toView(value) {
    if (value === 'true' || value === 'false'){
      value === 'false' ? false : true;
    }
    return value;
  }
}