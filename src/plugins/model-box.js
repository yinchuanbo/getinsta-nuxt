import Vue from 'vue';

//************************************自定义组件*******************************************
import modelBoxAlerts from '@/components/popup-layer/model-box/alert/alert';
// import modelBoxActionSheet from '@/components/model-box/action-sheet/action-sheet';
// import tipQrCode from '@/components/tip/qrcode/qrcode';
//
Vue.use(modelBoxAlerts);
// Vue.use(modelBoxActionSheet);
// Vue.use(tipQrCode);

import loading from '@/components/popup-layer/loading/loading/loading';
Vue.use(loading);
