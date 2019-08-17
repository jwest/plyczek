const { spawn } = require('child_process');
const app = require('../app.js');
const supertest = require('supertest');

const options = {
  dir: './integration-tests/dummy/sharing-dir/',
};

const request = supertest(app(options));

test('should list sharing files and dirs', async done => {
  const response = await request.get('/api/files');

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
