import * as moment from 'moment';

export class TimeAgoValueConverter {
  toView(value: string){
    return moment(value).fromNow();
  }
}