import async from './config';
const baseUrl = '/backapi/admin';

export default {
  /*登录*/
  login (params) {
    return async(`${baseUrl}/login`, params, 'post');
  },
  /*登出*/
  signOut () {
    return async(`${baseUrl}/signOut`);
  },

  getPostList (params) {
    return async(`${baseUrl}/getPostList`, params);
  },
  getPostTotal () {
    return async(`${baseUrl}/getPostTotal`);
  },

};
