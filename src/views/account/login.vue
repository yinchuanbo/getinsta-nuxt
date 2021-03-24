<template>
  <div class="login-register">
    <div class="header-blank"></div>
    <div class="login-register__title">
      <img src="@/assets/images/global/logo.svg" alt="Logo">
      <h1>{{ $t('account.login.title') }}</h1>
      <p>{{ $t('account.login.subTitle') }}</p>
    </div>
    <div class="login-register__form">
      <ValidationObserver v-slot="{ invalid, errors, validate}">
        <ValidationProvider v-slot="{ classes }" name="Email address" rules="required|email">
          <label class="email" :class="classes">
            <input
              v-model="form.field.email" name="email" type="email"
              :placeholder="$t('account.form.emailAddress')"
            >
          </label>
        </ValidationProvider>
        <ValidationProvider v-slot="{ classes }" name="Password" rules="required|min:4|max:18">
          <label class="password" :class="classes">
            <input
              v-model="form.field.password" name="password" type="password"
              :placeholder="$t('account.form.password')"
            >
          </label>
        </ValidationProvider>
        <label class="msg">
          <i v-for="(unit, i) in errors" v-show="unit[0]" :key="i">{{ unit[0] }}<br></i>
        </label>
        <label class="btn" @click="formSubmit(invalid, validate)">
          <button-purple text="Log In" :font-size="'size-16'" :square="true" :border-radius="6" :loading="ajaxRequesting" />
        </label>
      </ValidationObserver>
      <label class="links">
        <router-link to="/forgot">Forgot Password?</router-link>
        <router-link to="/register">Sign Up</router-link>
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
                <h3>Welcome</h3>
              </div>
              <p class="note">Jumping to User Center...</p>
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
                <h3>Oops</h3>
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
import defaultAvatar from '@/assets/images/global/icon_avatar_default.svg';

export default {
  name: 'Login',
  components: { ButtonPurple },
  data() {
    return {
      form: {
        field: {
          email: '',
          password: ''
        }
      },
      dialogSuccess: false,
      dialogFail: false,
      dialogFailMsg: '',
      ajaxRequesting: false,
      accountList: [],
      accountListIndex: 0,
    };
  },
  mounted() {
    this.autoFill();
  },
  methods: {
    closeDialog() {
      this.dialogSuccess = false;
      this.dialogFail = false;
    },
    formSubmit(invalid, validate) {
      validate();

      if (!this.COMMON.checkSupportLocalStorage('localStorage')) {
        this.dialogFailMsg = 'To browse the website normally, please enable <b>Cookies</b> from Settings or turn <b>Private Browsing</b> off.';
        this.dialogFail = true;
        return;
      }
      if (!invalid && !this.ajaxRequesting) {
        this.sendLoginInfo();
      }
      this.ga0();
    },
    sendLoginInfo() {
      let query = '';
      if (this.COMMON.getURLQuery('utm_source') === 'IOT-PC') {
        query = '-IOT-PC';
      }

      this.ajaxRequesting = true;
      this.$nuxt.$axios.post(
        api.login,
        this.COMMON.paramSign(
          {
            account: this.form.field.email,
            password: this.form.field.password,
            origin: `web${query}`
          }
        )
      ).then((response) => {
        // console.log(response.data);
        if (response.data.status === 'ok') {
          // this.dialogSuccess = true;

          this.$store.commit('loginChange', true); // Vuex Commit

          this.$storage.set('token', response.data.user.token);
          this.$storage.set('user', response.data.user);
          this.$storage.set('userCoins', response.data.user.coins.count);
          this.$storage.set('userInsAccount', response.data.user.ins_account);
          this.$storage.set('productPkgList', response.data.product);

          // User页面不需重新请求getInfo埋点
          this.$storage.set('needGetInfo', true);

          // this.preRenderHeaderAvatar(response.data.user.ins_account);
          this.renderHeaderAvatar(defaultAvatar);

          // 首次登录判断
          const firstLogin = response.data.user['first_login'];
          if (firstLogin) {
            // this.$router.push({ path: '/welcome' });
            // this.$router.push({ path: '/lucky-draw' });
            // if (this.$storage.get('fromBlog') === true)
            //   this.$router.push({ path: '/lucky-draw-test' });
            // else
            //   this.$router.push({ path: '/lucky-draw' });

            this.$router.push({ path: '/user' })

            // AB Test 分流
            // this.COMMON.randomAbTest() ? this.$router.push({ path: '/welcome' }) : this.$router.push({ path: '/lucky-draw' });
          } else {
            this.$router.push({ path: `/user${this.$constant.paymentChannel}` });
          }
        } else {
          if (response.data.error.type === 'bad_account') {
            this.dialogFailMsg = this.$t('account.errorText.badAccount');
          } else if (response.data.error.type === 'bad_password') {
            this.dialogFailMsg = this.$t('account.errorText.badPassword');
          } else if (response.data.error.type === 'account_locked') {
            this.dialogFailMsg = this.$t('account.errorText.accountLocked');
          } else {
            this.dialogFailMsg = '<samp>'
              + '<b>Error Status:</b> ' + error.status
              + '<br>' + '<b>Error Message:</b> ' + error.statusText
              + '</samp>';
          }
          this.dialogFail = true;
        }
        this.ajaxRequesting = false;
      }).catch((error) => {
        this.ajaxRequesting = false;
        // this.dialogFailMsg = '<samp>'
        //   + '<b>Error Status:</b> ' + error.status
        //   + '<br>' + '<b>Error Message:</b> ' + error.statusText
        //   + '</samp>';
        this.dialogFailMsg = this.$t('account.errorText.failed');
        this.dialogFail = true;
        console.log('Catch Error: sendLoginInfo');
        console.log(error);
      });
    },
    preRenderHeaderAvatar(insObj) {
      if (insObj.count > 0) {
        this.accountList = insObj['accounts'];
        const storedIndex = this.$storage.has('userInsAccountCurrentIndex');

        if (storedIndex) {
          if (insObj.count - 1 < this.$storage.get('userInsAccountCurrentIndex')) {
            this.accountListIndex = insObj.count - 1;
          } else {
            this.accountListIndex = this.$storage.get('userInsAccountCurrentIndex');
          }
        } else {
          this.accountListIndex = 0;
        }

        if (insObj['accounts'][this.accountListIndex]['post']) {
          this.renderHeaderAvatar(insObj['accounts'][this.accountListIndex]['profile_pic_url']);
        } else {
          this.dialogFailMsg = 'Server Ins Account Request Error. (Exceptional user.ins_account.accounts)';
          this.dialogFail = true;
          console.error('Server Ins Account Request Error. (Exceptional user.ins_account.accounts)');
        }
      } else {
        this.renderHeaderAvatar(defaultAvatar);
      }
    },
    renderHeaderAvatar(avatar) {
      this.$storage.set('userAvatar', avatar);
      this.$store.commit('userAvatar', avatar);
    },
    ga0() {
      this.$ga.event('buttonclick', 'click', 'lisignin');
    },
    autoFill() {
      const email = this.COMMON.getURLQuery('email');
      if (email !== null) {
        this.form.field.email = email;
      }
    }
  }
};
</script>

<style lang="scss" scoped src="./login-register.scss"></style>

