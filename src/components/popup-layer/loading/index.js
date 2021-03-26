import Vue from 'vue';

let events = require('events');
let eventEmitter = new events.EventEmitter();
export const dynamicVueEvent = eventEmitter;

let dyVueObj = Vue.extend({
  data() {
    return {
      allGlobalVue: []
    };
  },
  created() {
    dynamicVueEvent.on('addVueObj', (vueObj, attr, event) => {
      this.allGlobalVue.push({
        vueObj, attr, event
      });
    });
    dynamicVueEvent.on('deleteVueObj', (vueObj, attr) => {
      // console.log(vueObj);
      // console.log(attr);
      // this.allGlobalVue.findIndex(item => {
      //   return item.attr === attr;
      // });
      //
      // setTimeout(() => {
      //   this.allGlobalVue.splice(this.allGlobalVue.findIndex(item => {
      //     return item.vueObj === vueObj;
      //   }), 1);
      // }, 300);
      this.allGlobalVue = [];
    });
  },
  render(createElement) {
    return createElement('div', {
      class: {
        'loading-container': true
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

// nuxt warn
if (process.client)
  document.body.appendChild(instance.$el);

export function createVueObj(vueClass, attr, event) {
  let vueObj = Vue.extend(vueClass);
  dynamicVueEvent.emit('addVueObj', vueObj, attr, event);
  return vueObj;
}

export function deleteVueObj(obj) {
  dynamicVueEvent.emit('deleteVueObj', obj);
}
