const path = require('path');

module.exports = {
  db: {
    mysql: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
      database: 'song_blog',
      connectionLimit: 1000
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: '123456',
      db: 3,
      options: {
        return_buffers: false,
        auth_pass: ''
      }
    },
  },
  root: path.normalize(__dirname + '/..'),
  appPath: 'src',
  tempUploads: 'tempUploads',
  uploads: 'uploads',
  port: '9000',
  tokenSecret: 'test',
  isUpdateAdmin: true,
  accessControlAllowOrigin: 'http://localhost:3000',
  admin: 'admin',
  adminPassword: '123456',
  socketioPath: '/testsocketiopath',
  draftPostRedisKey: 'DRAFTPSOTKEY'
}
