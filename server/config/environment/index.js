const path = require('path');

//通过node_env来设置环境变量
let env = process.env.NODE_ENV || 'development';
env = env.toLowerCase();

//配置文件
const file = path.resolve(__dirname, env);
try {
  module.exports = require(file);
}catch(error){
  throw new Error(`You must set the environment variable: ${error}`);
}
