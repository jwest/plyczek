const { spawn } = require('child_process');
const app = require('../app.js');
const supertest = require('supertest');

const options = {
  dir: './integration-tests/dummy/sharing-dir/',
};

const request = supertest(app(options));

test('should list sharing files and dirs', async done => {
  // when
  const response = await request.get('/api/files');

  // then
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual({
    files: [
      {
        name: 'embedded-sharing-dir',
        leaf: false,
        files: [
          {
            name: 'embedded-sharing-file.txt',
            leaf: true,
            files: [],
            hrefs: {
              download: '/api/download/file?path=embedded-sharing-dir/embedded-sharing-file.txt',
            },
          },
        ],
        hrefs: {
          list: '/api/files?path=embedded-sharing-dir',
          download: '/api/download/zip?path=embedded-sharing-dir',
        },
      },
      {
        name: 'sharing-file.txt',
        leaf: true,
        files: [],
        hrefs: {
          download: '/api/download/file?path=sharing-file.txt',
        },
      },
    ],
  });

  done();
});

test('should list filtered sharing dirs', async done => {
  // when
  const response = await request.get('/api/files?leaf=false');

  // then
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual({
    files: [
      {
        name: 'embedded-sharing-dir',
        leaf: false,
        files: [],
        hrefs: {
          list: '/api/files?path=embedded-sharing-dir',
          download: '/api/download/zip?path=embedded-sharing-dir',
        },
      },
    ],
  });

  done();
});

test('should list sharing files and dirs via path', async done => {
  // when
  const response = await request.get('/api/files?path=embedded-sharing-dir');

  // then
  expect(response.status).toBe(200);
  expect(response.body).toStrictEqual({
    files: [
      {
        name: 'embedded-sharing-file.txt',
        leaf: true,
        files: [],
        hrefs: {
          download: '/api/download/file?path=embedded-sharing-dir/embedded-sharing-file.txt',
        },
      },
    ],
  });

  done();
});

test('should download sharing files and dirs as zip file', async done => {
  // when
  const response = await request.get('/api/files');

  // then
  expect(response.status).toBe(200);
  expect(response.body.files[0].name).toBe('embedded-sharing-dir');

  // and
  const zipResponse = await request.get(response.body.files[0].hrefs.download);  

  // then
  expect(zipResponse.status).toBe(200);

  expect(zipResponse.headers['content-type']).toMatch(/^application\/zip/);
  expect(zipResponse.headers['content-disposition']).toMatch(/^attachment; filename="embedded-sharing-dir.zip"/);

  done();
});
