import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { randomInteger } from './resources/utility'

@inject(HttpClient)
export class NiceAPI {
  constructor(http) {
    this.http = http.configure(x => {
      x.withBaseUrl('https://api.nice.social/');
    });
  }

  getRandomUserId() {
    this.isRequesting = true;
    return this.http.get('user/nicesummary').then((response) => {
        this.isRequesting = false;
        return response.content.data[randomInteger(response.content.data.length)].name;
    }).catch((err) => {
        console.log("Nice.Social API Issue");
        this.isRequesting = false;
        return 'berg';
  	});
  }
}