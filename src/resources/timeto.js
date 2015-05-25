import moment from 'moment';

export class TimeToValueConverter {
  toView(value){
    var date = moment().add(value, 'days');
    return moment(date).fromNow();
  }
}