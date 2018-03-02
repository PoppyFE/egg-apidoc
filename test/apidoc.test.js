'use strict';

const mock = require('egg-mock');

describe('test/apidoc.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/apidoc-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, apidoc')
      .expect(200);
  });
});
