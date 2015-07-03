import { Explore } from '../../src/models/explore';


describe('the Explore model',() => {
  var sut;

  beforeEach(() => {
    sut = new Explore('conversations');
  });

  it('contains a title property',() => {
    expect(sut.title).toEqual('Conversations');
  });

  it('contains an endpoint property',() => {
    expect(sut.endPoint).toEqual('conversations');
  });

  it('returns more than 2 clients',() => {
    expect(sut.getClients().length).toBeGreaterThan(2);
  });
});