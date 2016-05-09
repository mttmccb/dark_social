import * as moment from 'moment';

export class DaysUntilMilestoneValueConverter {
  toView(array: any[], milestone: number) {
    let daysInLastPosts = moment(array[array.length-1].created_at).diff(array[0].created_at,'days');
    let postRemaining = milestone - array[0].user.counts.posts;
    let dailyRate = array.length/ daysInLastPosts;
    return Math.round(postRemaining/(dailyRate*24));
  }
}