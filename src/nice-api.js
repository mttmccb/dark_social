import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';

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
        let randomUserId = Math.floor((Math.random() * response.content.data.length) + 1);
        this.isRequesting = false;
        return response.content.data[randomUserId].name;
    }).catch((err) => {
        console.log("Nice.Social API Issue");
        this.isRequesting = false;
        return 'berg';
  	});
  }
}