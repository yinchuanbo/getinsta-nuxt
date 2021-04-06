import Vue from 'vue';

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
