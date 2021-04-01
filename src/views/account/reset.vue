<template>
  <div class="login-register reset-top">
    <div class="header-blank"></div>
    <div class="login-register__title">
      <!--<img v-if="!pageIos" src="../../assets/images/global/logo.svg" alt="Logo">-->
      <!--<img v-if="pageIos" src="../../assets/images/global/logo_getinshot.svg" alt="Logo">-->
      <img :src="$store.state.productLogo" alt="Logo">
      <!-- <h1>{{ productName }}</h1> -->
      <h1>Reset Password</h1>
      <p>{{ $t('account.reset.subTitle') }}</p>
    </div>
    <transition>
      <div class="login-register_error" v-if="dialogFailMsg" v-html="dialogFailMsg"></div>
      <div class="login-register_ok" v-if="editok">{{ $t('account.successText.resetSuccess') }}</div>
    </transition>
    <div class="login-register__form">
      <ValidationObserver v-slot="{ invalid, errors, validate}">
        <ValidationProvider v-slot="{ classes }" vid="password" name="Password" rules="required|min:4|max:18">
          <label class="password" :class="classes">
            <input
              v-model="form.field.password" name="password" type="password"
              :placeholder="$t('account.form.password')"
            >
          </label>
          <p class="error-msg" v-if="errors['password']">{{ errors['password'][0] }}</p>
        </ValidationProvider>
        <ValidationProvider v-slot="{ classes }" name="Confirmed password" rules="required|confirmed:password">
          <label class="password" :class="classes">
            <input
              v-model="form.field.passwordConfirm" name="passwordConfirm" type="password"
              :placeholder="$t('account.form.confirmPassword')"
            >
          </label>
          <p class="error-msg" v-if="errors['Confirmed password']">{{ errors['Confirmed password'][0] }}</p>
        </ValidationProvider>
        <!-- <label class="msg">
          <i v-for="(unit, i) in errors" v-show="unit[0]" :key="i">{{ unit[0] }}<br></i>
        </label> -->
        <label class="btn" @click="formSubmit(invalid, validate)">
          <!-- <button-purple
            :text="$t('account.reset.btnResetPassword')"
            :font-size="'size-16'" :square="true" :border-radius="6" :loading="ajaxRequesting"
          /> -->
          <button-purple
            text="Update Password"
            :font-size="'size-16'" :square="true" :border-radius="6" :loading="ajaxRequesting"
          />
        </label>
      </ValidationObserver>
      <label v-if="!pageIos" class="links">
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
              <p class="note">{{ $t('account.successText.resetSuccess') }}</p>
              <div class="btn" @click="closeDialog()">
                <router-link v-if="!pageIos" to="/login">
                  <button-purple
                    :text="$t('account.reset.btnLoginAccount')"
                    :font-size="'size-16'" :square="true"
                  />
                </router-link>
                <button-purple v-if="pageIos" text="Close" :font-size="'size-16'" :square="true" />
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
                <button-purple
                  :text="$t('global.modelBox.btn.close')"
                  :font-size="'size-16'" :square="true"
                />
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
  name: 'Reset',
  components: { ButtonPurple },
  data() {
    return {
      form: {
        field: {
          password: '',
          passwordConfirm: '',
          key: null
        }
      },
      dialogSuccess: false,
      dialogFail: false,
      dialogFailMsg: '',
      ajaxRequesting: false,
      pageIos: process.client ? window.location.hostname !== this.$constant.url.easy : false,
      productName: this.$store.state.productName,
      editok: false
    };
  },
  mounted() {
    this.identifyKey();
  },
  methods: {
    closeDialog() {
      this.dialogSuccess = false;
      this.dialogFail = false;
    },
    formSubmit(invalid, validate) {
      validate();
      if (this.form.field.key === null) {
        this.dialogFailMsg = this.$t('account.errorText.resetKeyError');
        // this.dialogFail = true;
        return;
      }
      if (!invalid && !this.ajaxRequesting) {
        this.submitForm();
      }
    },
    submitForm() {
      this.ajaxRequesting = true;
      this.$nuxt.$axios.post(
        api.reset,
        this.COMMON.paramSign(
          {
            key: this.form.field.key,
            new_password: this.form.field.password
          }
        )
      ).then((response) => {
        // console.log(response.data);
        if (response.data.status === 'ok') {
          // this.dialogSuccess = true;
          this.editok = true
        } else {
          if (response.data.error.type === 'bad_key') {
            this.dialogFailMsg = this.$t('account.errorText.badKey');
          } else {
            this.dialogFailMsg = '<samp>'
              + '<b>Error Type:</b> ' + response.data.error.type
              + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
              + '</samp>';
          }
          // this.dialogFail = true;
        }
        this.ajaxRequesting = false;
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.dialogFailMsg = '<samp>'
          + '<b>Error Status:</b> ' + error.status
          + '<br>' + '<b>Error Message:</b> ' + error.statusText
          + '</samp>';
        // this.dialogFail = true;
        console.log('Catch Error: submitForm');
        console.log(error);
      });
    },
    identifyKey() {
      this.form.field.key = this.COMMON.getURLQuery('key');
    }
  }
};
</script>

<style lang="scss" scoped src="./login-register.scss"></style>
