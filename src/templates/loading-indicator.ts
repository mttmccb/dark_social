import { bindable, noView } from 'aurelia-framework';
import * as nprogress from 'nprogress';

@noView
export class LoadingIndicator {
  @bindable loading: boolean = false;

  loadingChanged(newValue: boolean) {
    newValue ?
      nprogress.start() :
      nprogress.done();
  }
}