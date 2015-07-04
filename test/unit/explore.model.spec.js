import { ExploreModel } from '../../src/models/explore-model';


describe('the Explore model',() => {
  var sut;

  beforeEach(() => {
    sut = new ExploreModel('trending');
  });

  it('contains a title property',() => {
    expect(sut.title).toEqual('Trending');
  });

  it('contains an endpoint property',() => {
    expect(sut.endPoint).toEqual('trending');
  });

  it('returns 1 client',() => {
    expect(sut.getClients().length).toEqual(1);
  });
});