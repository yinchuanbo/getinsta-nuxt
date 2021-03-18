import Vue from 'vue';
import { createVueObj, deleteVueObj } from '../model-box';
// createVueObj  全局生成组件函数
// deleteVueObj  全局删除由createVueObj生成的组件
import vueVM from './view-special-award.vue';

function modelBoxSpecialAward(type, number) {
  return new Promise((resolve, reject) => {
    let dyVueObj = createVueObj(vueVM, {
      type, number
    }, {
      ok(res) {
        deleteVueObj(dyVueObj);
        resolve(res);
      },
      cancel() {
        deleteVueObj(dyVueObj);
        reject('Dialog closed.');
      }
    });
  });
}

function registryModelBoxSpecialAward() {
  Vue.prototype.$specialAward = modelBoxSpecialAward;
}

export default registryModelBoxSpecialAward;
