const baseUrl = '/backapi/admin';

export default {
  /*登录*/
  login (userName, password) {
    return async(
      `${baseUrl}/login`, {
        userName: userName,
        password: password
      },
      'post'
    );
  },
  /*登出*/
  signOut () {
    return async(`${baseUrl}/signOut`);
  },

};
