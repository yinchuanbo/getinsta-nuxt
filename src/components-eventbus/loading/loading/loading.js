import Vue from 'vue';
import { createVueObj, deleteVueObj } from '../loading';
import vueVM from './loading.vue';

function Loading(open) {
  return new Promise((resolve, reject) => {
    let dyVueObj = createVueObj(
      vueVM,
      { open },
      {
        ok(res) {
          deleteVueObj(dyVueObj);
          resolve(res);
        }
      });
  });
}

function registryLoading() {
  Vue.prototype.$loading = Loading;
}

export default registryLoading;
