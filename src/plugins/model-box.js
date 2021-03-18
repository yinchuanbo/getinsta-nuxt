import Vue from 'vue';

//************************************自定义弹出层组件*******************************************
import modelBoxAlert from '@/components/popup-layer/model-box/alert/alert';
import modelBoxActionSheet from '@/components/popup-layer/model-box/action-sheet/action-sheet';
import modelBoxSpecialAward from '@/components/popup-layer/model-box/special-award/special-award';
import tipQrCode from '@/components/popup-layer/tip/qrcode/qrcode';
import loading from '@/components/popup-layer/loading/loading/loading';

Vue.use(modelBoxAlert);
Vue.use(modelBoxActionSheet);
Vue.use(modelBoxSpecialAward);
Vue.use(tipQrCode);
Vue.use(loading);
