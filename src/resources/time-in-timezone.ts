import * as moment from 'moment-timezone';

export class TimeInTimeZoneValueConverter {
  toView(timezone: string){
    return timezone? moment().tz(timezone).format('HH:mm z') : '';
  }
}