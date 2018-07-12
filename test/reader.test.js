'use strict';
const r = require('../lib/reader');

describe('test filesreader', () => {
  test('read方法', () => {
    r.read('../filesreader').on('end', (err, data) => {
      expect(err === null);
    }).on('error', err => {
      console.log(err);
    })
  });

  test('read方法', () => {
    r.read('./node_modules').fileFilter('./node_modules/.bin', () => {
      console.log('I am success');
    });
  });
});
