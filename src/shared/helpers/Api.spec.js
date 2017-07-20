/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-let */
import request from 'superagent';
import superagentMock from 'superagent-mock';
import Api from './Api';

describe('isOnline', () => {
  let api = null;
  let mock = null;

  beforeEach(() => {
    api = new Api();
  });

  afterEach(() => {
    mock.unset();
  });

  it('should send correct post request in browser', () => {
    let actualInput = '';
    let actualBody = '';
    let actualHeaders = '';

    mock = superagentMock(request, [{
      pattern: 'http://localhost:3000',
      fixtures: (match, params, headers) => {
        actualHeaders = headers;
        actualBody = params;
        actualInput = match.input;
      },
      post: (match, data) => ({ body: data }),
    }]);
    const mockedUrl = 'http://localhost:3000/api/someReq';

    api.setJwtToken('somehash');
    api.post(mockedUrl, {
      params: {
        param: '1',
      },
      data: {
        name: 'data',
      },
      headers: {
        some: 'random',
      },
      files: [{ key: 'file', value: 'file' }],
      fields: [{ key: 'field', value: 'field' }],
    });

    expect(actualInput).toBe('/v1/api/http://localhost:3000/api/someReq?param=1');
    expect(actualBody).toEqual({ name: 'data' });
    expect(actualHeaders.Authorization).toBe('Bearer somehash');
    expect(actualHeaders.some).toBe('random');
  });

  it('should send correct post request on server', () => {
    global.window = {};

    let actualInput = '';
    let actualBody = '';
    let actualHeaders = '';

    mock = superagentMock(request, [{
      pattern: 'http://localhost:3000',
      fixtures: (match, params, headers) => {
        actualHeaders = headers;
        actualBody = params;
        actualInput = match.input;
      },
      post: (match, data) => ({ body: data }),
    }]);
    const mockedUrl = 'http://localhost:3000/api/someReq';

    api.setJwtToken('somehash');
    api.post(mockedUrl, {
      params: {
        param: '1',
      },
      data: {
        name: 'data',
      },
      headers: {
        some: 'random',
      },
      files: [{ key: 'file', value: 'file' }],
      fields: [{ key: 'field', value: 'field' }],
    });

    expect(actualInput).toBe('/v1/api/http://localhost:3000/api/someReq?param=1');
    expect(actualBody).toEqual({ name: 'data' });
    expect(actualHeaders.Authorization).toBe('Bearer somehash');
    expect(actualHeaders.some).toBe('random');
  });
});