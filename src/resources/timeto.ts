import * as moment from 'moment';

export class TimeToValueConverter {
  toView(value: string){
    var date = moment().add(value, 'days');
    return moment(date).fromNow();
  }
}