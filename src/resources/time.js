export class TimeValueConverter {
  toView(value){
    return Math.round(( new Date() - Date.parse(value) ) /3600000);
  }
}