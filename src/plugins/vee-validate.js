import Vue from 'vue';

import { ValidationObserver, ValidationProvider, configure, setInteractionMode, extend } from 'vee-validate';
import {
  required,
  email,
  confirmed,
  alpha_dash,
  min,
  max,
  is_not,
  numeric,
  between,
  digits
} from 'vee-validate/dist/rules';

configure({
  classes: {
    // valid: 'valid',
    invalid: 'invalid'
    // dirty: ['is-dirty', 'is-dirty']
  }
});

setInteractionMode('lazy');

extend('required', required);
extend('required_lite', {
  ...required,
  message: 'Invalid'
});
extend('email', email);
extend('is_not', is_not);
extend('alpha_dash', {
  ...alpha_dash,
  message: '{_field_} can only contain alphabetic characters, numbers, dashes or underscores'
});
extend('min', {
  ...min,
  message: '{_field_} must have {length} or more characters'
});
extend('min_lite', {
  ...min,
  message: 'Invalid'
});
extend('max', {
  ...max,
  message: '{_field_} cannot be longer than {length} characters'
});
extend('max_lite', {
  ...max,
  message: 'Invalid'
});
extend('confirmed', {
  ...confirmed,
  message: 'Two passwords entered are different'
});
extend('full_name', value => {
  return /(^\s+)|(\s+$)|\s+/g.test(value);
});
extend('email_provider', {
  validate: (value, providerListArray) => {
    let emailDomain = '';
    if (value.indexOf('@') !== -1) {
      emailDomain = value.substring(value.indexOf('@') + 1, value.length);
      return providerListArray.indexOf(emailDomain) !== -1;
    } else {
      return false;
    }
  },
  message: 'The email domain you used is not available for registration. Please choose a different email.'
});
extend('numeric', numeric);
extend('numeric_lite', {
  ...numeric,
  message: 'Invalid'
});
extend('between', between);
extend('between_lite', {
  ...between,
  message: 'Invalid'
});
extend('digits', digits);
extend('digits_lite', {
  ...digits,
  message: 'Invalid'
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
