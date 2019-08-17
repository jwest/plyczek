const app = require('./app.js');
const port = process.env.PORT || 3000;

options = {
  dir: process.argv[2] || '.',
};

const server = app(options);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${server.address().port}`);
});
