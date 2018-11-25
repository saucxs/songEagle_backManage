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
  getPostById (id) {
    return async(`${baseUrl}/getPostById/${id}`);
  },
  addPost (params) {
    return async(`${baseUrl}/addPost`, params, 'post');
  },
  updatePost (params) {
    return async(`${baseUrl}/updatePost/${params.id}`, params.newPost, 'post');
  },
  offlinePost (id) {
    return async(`${baseUrl}/offlinePost/${id}`, {}, 'put');
  },
  publishPost (id) {
    return async(`${baseUrl}/publishPost/${id}`, {}, 'put');
  },
  deletePost (id) {
    return async(`${baseUrl}/deletePost/${id}`, {}, 'delete');
  },
  getPostsByCatId (params) {
    console.log(params,'111111111111111111111111111111111111111111111111111111')
    return async(`${baseUrl}/getPostsByCatId/${params.id}`, {
      page: params.page,
      pageNum: params.pageSize
    });
  },
  getPostsByTagId (params) {
    return async(`${baseUrl}/getPostsByTagId/${params.id}`, {
      page: params.page,
      pageNum: params.pageSize
    });
  }

};
