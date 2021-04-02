<template>
  <div class="login-register fgTop">
    <div class="header-blank"></div>
    <div class="login-register__title">
      <img src="../../assets/images/global/logo.svg" alt="Logo">
      <h1>{{ $t('account.forgot.title') }}</h1>
      <p>{{ $t('account.forgot.subTitle') }}</p>
    </div>
    <transition>
      <div v-if="dialogFailMsg" class="login-register_error" v-html="dialogFailMsg"></div>
      <div v-if="editok" class="login-register_ok">{{ $t('account.successText.forgotSuccess') }}</div>
    </transition>
    <div class="login-register__form">
      <ValidationObserver v-slot="{ invalid, errors, validate}">
        <ValidationProvider v-slot="{ classes }" name="Email address" rules="required|email">
          <label class="email" :class="classes">
            <input
              v-model="form.field.email" name="email" type="email"
              :placeholder="$t('account.form.emailAddress')"
            >
          </label>
          <p v-if="errors['Email address']" class="error-msg">{{ errors['Email address'][0] }}</p>
        </ValidationProvider>
        <!-- <label class="msg">
          <i v-for="(unit, i) in errors" v-show="unit[0]" :key="i">{{ unit[0] }}<br></i>
        </label> -->
        <label class="btn" @click="formSubmit(invalid, validate)">
          <button-purple
            :text="$t('global.modelBox.title.success')"
            :font-size="'size-16'" :square="true" :border-radius="6" :loading="ajaxRequesting"
          />
        </label>
      </ValidationObserver>
      <label class="links">
        <router-link to="/login">{{ $t('account.link.LogIn') }}</router-link>
        <router-link to="/register">{{ $t('account.link.SignUp') }}</router-link>
      </label>
    </div>

    <transition name="fade">
      <div v-if="dialogSuccess" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <div class="content">
            <div class="model-box success">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ $t('global.modelBox.title.success') }}</h3>
              </div>
              <p class="note">{{ $t('account.successText.forgotSuccess') }}</p>
              <div class="btn" @click="closeDialog()">
                <button-purple text="Close" :font-size="'size-16'" :square="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="dialogFail" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box alert">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ $t('global.modelBox.title.oops') }}</h3>
              </div>
              <p class="note" v-html="dialogFailMsg"></p>
              <div class="btn" @click="closeDialog()">
                <button-purple text="Close" :font-size="'size-16'" :square="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';
import api from '@/api/api.account';

export default {
  name: 'Forgot',
  components: { ButtonPurple },
  data() {
    return {
      form: {
        field: {
          email: ''
        }
      },
      dialogSuccess: false,
      dialogFail: false,
      dialogFailMsg: '',
      ajaxRequesting: false,
      editok: false
    };
  },
  methods: {
    closeDialog() {
      this.dialogSuccess = false;
      this.dialogFail = false;
    },
    formSubmit(invalid, validate) {
      validate();
      if (!invalid && !this.ajaxRequesting) {
        this.submitForm();
      }
    },
    submitForm() {
      this.ajaxRequesting = true;
      this.$nuxt.$axios.post(
        api.sendResetEmail,
        this.COMMON.paramSign(
          {
            account: this.form.field.email
          }
        )
      ).then((response) => {
        if (response.data.status === 'ok') {
          // this.dialogSuccess = true;
          this.editok = "true"
        } else {
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
          // this.dialogFail = true;
        }
        this.ajaxRequesting = false;
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.dialogFailMsg = '<samp>' + error + '</samp>';
        // this.dialogFail = true;
        console.log('Catch Error: submitForm');
        console.log(error);
      });
    }
  }
};
</script>

<style lang="scss" scoped src="./login-register.scss"></style>
