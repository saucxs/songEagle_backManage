const app = require('./config/koa');
const config = require('./config/environment');
const query = require('./util/mysql-async');
const Store = require('./util/redis-store');
const draftSocket = require('./util/draft-socketio');
const redisMysql = require('./util/redis-mysql');
const session = require('koa-session2');
const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('koa-logger');

app.use(logger())

app.use(session({
  store: new Store(config.db.redis),
  ttl: 2 * 60 * 60 * 1000
}));

app.use(async(ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  ctx.execSql = query;
  await next();
});

// routes
fs.readdirSync(path.join(__dirname, 'routes')).forEach(function (file) {
  if (~file.indexOf('.js')) {
    app.use(require(path.join(__dirname, 'routes', file)).routes());
  }
});

app.use(function (ctx, next) {
  ctx.redirect('/404.html');
});

app.on('error', (error, ctx) => {
  console.log('something error ' + JSON.stringify(ctx.onerror));
  ctx.redirect('/500.html');
})

const server = http.createServer(app.callback())
  .listen(config.port)
  .on('listening', function () {
    console.log('server listening on: ' + config.port);
  });

// 初始化websocket
draftSocket.initSocket(server);

// 初始化定时任务
redisMysql.redisToMysqlTask();
