import Vue from 'vue';
import { createVueObj, deleteVueObj } from '../tip';
import vueVM from './qrcode.vue';

function tipQrCode(qrCode, ...args) {
  // qrCode === false --> 清除所有 qrCode DOM
  // typeof qrCode === 'String' --> 显示
  if (!window.getInstaTipAllowed) return false;

  return new Promise((resolve, reject) => {
    if (qrCode && args.length > 1) {
      const x = args[0], y = args[1];
      let dyVueObj = createVueObj(vueVM, {
        qrCode, x, y
      }, {
        ok(res) {
          deleteVueObj(dyVueObj);
          resolve(res);
        },
        close(e) {
          deleteVueObj(dyVueObj);
          resolve(e);
        }
      });
    } else {
      deleteVueObj(vueVM, { qrCode });
    }
  }).catch(() => {
    console.log('tipQrCode: close');
  });
}

function registryTipQrCode() {
  Vue.prototype.$tipQrCode = tipQrCode;
}

export default registryTipQrCode;
