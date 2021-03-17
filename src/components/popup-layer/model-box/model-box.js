import Vue from 'vue';

let events = require('events');
let eventEmitter = new events.EventEmitter();
export const dynamicVueEvent = eventEmitter;

let dyVueObj = Vue.extend({
  data() {
    return {
      allGlobalVue: [] // 临时动态添加的窗体，例如弹窗等
    };
  },
  created() {
    // 支持全局调用临时添加，用完即删型vue组件
    dynamicVueEvent.on('addVueObj', (vueObj, attr, event) => {
      this.allGlobalVue.push({
        vueObj, attr, event
      });
    });
    dynamicVueEvent.on('deleteVueObj', (vueObj) => {
      this.allGlobalVue.splice(this.allGlobalVue.findIndex(item => {
        return item.vueObj === vueObj;
      }), 1);
    });
  },
  render(createElement) {
    return createElement('div', {
      class: {
        'model-box-container': true
      }
    }, this.allGlobalVue.map(item => {
      return createElement(item.vueObj, {
        props: item.attr,
        on: item.event
      });
    }));
  }
});

let instance = new dyVueObj({
  el: document.createElement('div')
});
document.body.appendChild(instance.$el);

export function createVueObj(vueClass, attr, event) {
  let vueObj = Vue.extend(vueClass);
  dynamicVueEvent.emit('addVueObj', vueObj, attr, event);
  return vueObj;
}

export function deleteVueObj(obj) {
  dynamicVueEvent.emit('deleteVueObj', obj);
}
