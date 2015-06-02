import nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';

@noView
export class LoadingIndicator {
  @bindable loading = false;

  loadingChanged(newValue){
    newValue ?
      nprogress.start() :
      nprogress.done();
  }
}