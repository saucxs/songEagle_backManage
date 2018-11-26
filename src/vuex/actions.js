import Login from "../api/login";
import Post from "../api/post";
import Tag from "../api/tag";
import Laboratory from "../api/laboratory";
import Category from "../api/category";
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

// deleteLaboratory
export const deleteLaboratory = ({ commit }, params) => {
  return Laboratory.deleteLaboratory(params).then(response => {
    return response;
  })
}

// updateLaboratory
export const updateLaboratory = ({ commit }, params) => {
  return Laboratory.updateLaboratory(params).then(response => {
    return response;
  })
}

// getCategories
export const getCategories = ({ commit }, params) => {
  return Category.getCategories(params).then(response => {
    return response;
  })
}

// getPostsByCatId
export const getPostsByCatId = ({ commit }, params) => {
  return Post.getPostsByCatId(params).then(response => {
    return response;
  })
}

// addNewCategory
export const addNewCategory = ({ commit }, params) => {
  return Category.addNewCategory(params).then(response => {
    return response;
  })
}

// updateCategory
export const updateCategory = ({ commit }, params) => {
  return Category.updateCategory(params).then(response => {
    return response;
  })
}

// deleteCategory
export const deleteCategory = ({ commit }, params) => {
  return Category.deleteCategory(params).then(response => {
    return response;
  })
}


// getPostById
export const getPostById = ({ commit }, params) => {
  return Post.getPostById(params).then(response => {
    return response;
  })
}

// updatePost
export const updatePost = ({ commit }, params) => {
  return Post.updatePost(params).then(response => {
    return response;
  })
}

// publishPost
export const publishPost = ({ commit }, params) => {
  return Post.publishPost(params).then(response => {
    return response;
  })
}

//addPost
export const addPost = ({ commit }, params) => {
  return Post.addPost(params).then(response => {
    return response;
  })
}

//deletePost
export const deletePost = ({ commit }, params) => {
  return Post.deletePost(params).then(response => {
    return response;
  })
}

//offlinePost
export const offlinePost = ({ commit }, params) => {
  return Post.offlinePost(params).then(response => {
    return response;
  })
}

//getLaboratories
export const getLaboratories = ({ commit }, params) => {
  return Laboratory.getLaboratories(params).then(response => {
    return response;
  })
}

//createNewLaboratory
export const createNewLaboratory = ({ commit }, params) => {
  return Laboratory.createNewLaboratory(params).then(response => {
    return response;
  })
}

//getTags
export const getTags = ({ commit }, params) => {
  return Tag.getTags(params).then(response => {
    return response;
  })
}

//getPostsByTagId
export const getPostsByTagId = ({ commit }, params) => {
  return Post.getPostsByTagId(params).then(response => {
    return response;
  })
}

//addNewTag
export const addNewTag = ({ commit }, params) => {
  return Tag.addNewTag(params).then(response => {
    return response;
  })
}

//updateTag
export const updateTag = ({ commit }, params) => {
  return Tag.updateTag(params).then(response => {
    return response;
  })
}

//deleteTag
export const deleteTag = ({ commit }, params) => {
  return Tag.deleteTag(params).then(response => {
    return response;
  })
}

//addNewTagWhenPost
export const addNewTagWhenPost = ({ commit }, params) => {
  return Tag.addNewTagWhenPost(params).then(response => {
    return response;
  })
}

//searchTagByName
export const searchTagByName = ({ commit }, params) => {
  return Tag.searchTagByName(params).then(response => {
    return response;
  })
}


