var koa = require('koa');
var controller = require('koa-route');
var app = koa();

var views = require('co-views');
var render = views('./view', {
  map: { html: 'ejs' }
});

var koa_static = require('koa-static-server');
app.use(koa_static({
  rootDir: './static/',
  rootPath: '/static/',
  maxage: 0
}));

var service = require('./service/webAppService');

app.use(controller.get('/route_test', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = 'Hello koa!';
}));

app.use(controller.get('/ejs_test', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = yield render('test', { title: 'title_test'});
}));

app.use(controller.get('/api_test', function*() {
  this.set('Cache-Control', 'no-cache');
  this.body = service.get_test_data();
}));

app.listen(3001);
console.log('koa server is started!')
