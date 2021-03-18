import Vue from 'vue';
import { createVueObj, deleteVueObj } from '../model-box';
// createVueObj  全局生成组件函数
// deleteVueObj  全局删除由createVueObj生成的组件
import vueVM from './view-alert.vue';

function modelBoxAlert(bg, icon, title, body, button, btnText, btnStyle) {
  return new Promise((resolve, reject) => {
    let dyVueObj = createVueObj(vueVM, {
      bg,
      icon,
      title,
      body,
      button,
      btnText,
      btnStyle
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

function registryModelBoxAlert() {
  Vue.prototype.$alert = modelBoxAlert;
}

export default registryModelBoxAlert;
