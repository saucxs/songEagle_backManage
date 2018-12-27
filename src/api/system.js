import async from './config';
const baseUrl = '/backapi/admin';

export default {
  getSystem () {
    return async(`${baseUrl}/getSystem`);
  },
  // createNewLaboratory (params) {
  //   return async(`${baseUrl}/createNewLaboratory`, params, 'post', true);
  // },
  // updateLaboratory (params) {
  //   return async(`${baseUrl}/updateLaboratory`, params, 'post', true);
  // },
  // deleteLaboratory (id) {
  //   return async(`${baseUrl}/deleteLaboratory/${id}`, {}, 'delete');
  // }

};
