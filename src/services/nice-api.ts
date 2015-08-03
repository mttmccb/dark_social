import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { randomInteger } from '../resources/utility';

@autoinject
export class NiceAPI {
  public isRequesting: boolean;
  
  constructor(private http: HttpClient) {
    this.http = http.configure((x: any) => {
      x.withBaseUrl('https://api.nice.social/');
    });
  }

  getRandomUserId() {
    this.isRequesting = true;
    return this.http.get('user/nicesummary').then((response: any) => {
        this.isRequesting = false;
        return response.content.data[randomInteger(response.content.data.length)].name;
    }).catch((err: any) => {
        console.log("Nice.Social API Issue");
        this.isRequesting = false;
        return 'berg';
  	});
  }
}