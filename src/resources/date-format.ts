import * as moment from 'moment';

export class DateFormatValueConverter {
  toView(value: string, format: string){
    return moment(value).format(format);
  }
}