import Vue from 'vue';
import { createVueObj, deleteVueObj } from '../model-box';
// createVueObj  全局生成组件函数
// deleteVueObj  全局删除由createVueObj生成的组件
import vueVM from './action-sheet.vue';

function modelBoxActionSheet(mask, bg, icon, title, body, button, btnText, appAnalytics) {
  return new Promise((resolve, reject) => {
    let dyVueObj = createVueObj(
      vueVM,
      { mask, bg, icon, title, body, button, btnText, appAnalytics },
      {
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

function registryModelBoxActionSheet() {
  Vue.prototype.$actionSheet = modelBoxActionSheet;
}

export default registryModelBoxActionSheet;
