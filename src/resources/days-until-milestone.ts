import { parseDate } from './utility';

export class DaysUntilMilestoneValueConverter {
  toView(array: any[], milestone: number) {
    let daysInLastPosts = parseDate(array[array.length-1].created_at)-parseDate(array[0].created_at);
    let postRemaining = milestone - array[0].user.counts.posts;
    let dailyRate = array.length/ daysInLastPosts;
    return Math.round(postRemaining/(dailyRate*24));
  }
}