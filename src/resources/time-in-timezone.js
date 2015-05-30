import moment from 'moment-timezone';

export class TimeInTimeZoneValueConverter {
  toView(timezone){
    return moment().tz(timezone).format('HH:mm z');
  }
}