import Vue from 'vue';

//************************************第三方组件*******************************************
import GoTop from '@inotom/vue-go-top';
// import DigitRoll from '@huoyu/vue-digitroll'; // DigitRoll 数值缓动
// import VueScroll from 'vue-scroll';  //
import VueScrollTo from 'vue-scrollto'; // 锚点定位
import VueCookies from 'vue-cookies'; //Cookie
import { Vue2Storage } from 'vue2-storage'; //WEB Storage
import Vue2TouchEvents from 'vue2-touch-events'; // Touch Events
import Pagination from 'vue-pagination-2'; // 分页
// import vueAwesomeCountdown from 'vue-awesome-countdown';

// Vue.use(GoTop);
Vue.component('GoTop', GoTop);
// Vue.use(VueScroll);
Vue.use(VueScrollTo);
Vue.use(VueCookies);
Vue.use(Vue2Storage, {
  prefix: 'GetInsta_',
  driver: 'local',
  // ttl: 60 * 60 * 24 * 1000 // 24 hours
  ttl: 0
});
Vue.use(Vue2TouchEvents, { swipeTolerance: 30 });
Vue.component('Pagination', Pagination);
// Vue.use(vueAwesomeCountdown, 'vac'); // Component name, `countdown` and `vac` by default


// element
import {
  Slider,
  Checkbox,
  CheckboxGroup
} from "element-ui";

Vue.use(Slider);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.prototype.$slider = Slider;
Vue.prototype.$checkbox = Checkbox;
import "element-ui/lib/theme-chalk/index.css";
