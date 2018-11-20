import async from './config';
const baseUrl = '/backapi/admin';

export default {
  getTags () {
    return async(`${baseUrl}/getTags`);
  },
  addNewTagWhenPost (name) {
    return async(`${baseUrl}/addNewTagWhenPost/${name}`, {}, 'put');
  },
  addNewTag (name) {
    return async(`${baseUrl}/addNewTag/${name}`, {}, 'put');
  },
  updateTag (params) {
    return async(`${baseUrl}/updateTag/${params.id}?name=${params.name}`, {}, 'put');
  },
  deleteTag (id) {
    return async(`${baseUrl}/deleteTag/${id}`, {}, 'delete');
  },
  searchTagByName (name) {
    return async(`${baseUrl}/searchTagByName/${name}`);
  }

};
