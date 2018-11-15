const Koa = require('koa');
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const resource = require('koa-static');
const path = require('path');
const jwt = require('koa-jwt');
const config = require('./environment');

//admin账号通过配置写入到数据库中
if(config.isUpdateAdmin){
  adminAccount.saveAdminAccount();
}

const app = new Koa();

app.use(bodyParser());
app.use(koaJson());
app.use(resource(path.join(config.root, config.appPath)));
app.use(jwt({
  secret: config.tokenSecret
}).unless({
  path: [/^\/backapi\/admin\/login/, /^\/blogapi\//, /^\/blogapi\/oauth\//]
}))

module.exports = app;
