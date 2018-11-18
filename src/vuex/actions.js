import Login from "../api/login";
import Post from "../api/post";
import * as types from "./mutation-types";

// example
// export const getUserInfo = ({commit},params) => {
//   return Login.getUserInfo(params).then(response => {
//     commit(types.USER_INFO,response.data);
//     return response;
//   })
// }

// login
export const login = ({ commit }, params) => {
  return Login.login(params).then(response => {
    return response;
  })
}

// getPostList
export const getPostList = ({ commit }, params) => {
  return Post.getPostList(params).then(response => {
    return response;
  })
}

// getPostTotal
export const getPostTotal = ({ commit }, params) => {
  return Post.getPostTotal(params).then(response => {
    return response;
  })
}
