const { handler, server } = require('./server.js');

const endpoints = [
  {url: '/unknown', status_code: 404, body: '404 server error'},
  {url: '/', status_code: 200, body: 'view = \'fac\''},
  {url: '/fac', status_code: 200, body: 'view = \'fac\''},
  {url: '/dwyl', status_code: 200, body: 'view = \'dwyl\''},
  {url: '/css/stylesheet.css', status_code: 200, body: 'body {'},
  {url: '/js/request.js', status_code: 200},
  {url: '/js/index.js', status_code: 200, body: 'request.get('},
  {url: '/api/repos/fac', status_code: 200},
  {url: '/api/repos/dwyl', status_code: 200}
];

afterAll(() => {
  server.close()
})

endpoints.forEach((endpoint) => {
  test('GET :: ' + endpoint.url + ' :: returns ' + endpoint.status_code, (done) => {    
    handler({url: endpoint.url}, {
      writeHead: (status, _content) => {
        expect(status).toBe(endpoint.status_code);
      },
      end: (body) => {
        expect(endpoint.body ? body.includes(endpoint.body) : body).toBeTruthy();
        done()
      }
    });
  });
});
