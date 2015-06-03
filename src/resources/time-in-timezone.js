import moment from 'moment-timezone';

export class TimeInTimeZoneValueConverter {
  toView(timezone){
    return timezone? moment().tz(timezone).format('HH:mm z') : '';
  }
}