import {Profile} from '../../src/profile';

class HttpStub {
  get(url) {
    var response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({ content: { data: response } });
    })
  }
}

describe('the Profile module', () => {

  it('sets jsonp response to images', (done) => {
    var http = new HttpStub(),
        sut = new Profile(http),
        itemStubs = [1],
        itemFake = [2];

    http.itemStub = itemStubs;
    sut.activate().then(() => {
      expect(sut.images).toBe(itemStubs);
      expect(sut.images).not.toBe(itemFake);
      done();
    });
  });
});
