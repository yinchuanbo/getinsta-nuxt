<template>
  <div class="login-register">
    <div v-if="!(pageIos || pageAff)" class="header-blank"></div>
    <div class="login-register__title">
      <!--<img v-if="!pageIos" src="../../assets/images/global/logo.svg" alt="Logo">-->
      <!--<img v-if="pageIos" src="../../assets/images/global/logo_getinshot.svg" alt="Logo">-->
      <img :src="$store.state.productLogo" alt="Logo">
      <h1>{{ $t('account.register.title') }}</h1>
      <p>{{ $t('account.register.subTitle') }}</p>
    </div>
    <div class="login-register__form">
      <ValidationObserver v-slot="{ invalid, errors, validate}">
        <ValidationProvider v-slot="{ classes }" name="Username" rules="required|alpha_dash|min:4|max:44">
          <label class="username" :class="classes">
            <input
              v-model="form.field.username" name="username" type="text"
              :placeholder="$t('account.form.username')"
            >
          </label>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ classes }" name="Email"
          :rules="emailProviderGetter ? `required|email_provider:${emailProvider}` : 'required'"
        >
          <label class="email" :class="classes">
            <input
              v-model="form.field.email" name="email" type="email"
              :placeholder="$t('account.form.emailAddress')"
            >
          </label>
        </ValidationProvider>

        <ValidationProvider v-slot="{ classes }" vid="password" name="Password" rules="required|min:4|max:18">
          <label class="password" :class="classes">
            <input
              v-model="form.field.password" name="password" type="password"
              :placeholder="$t('account.form.password')"
            >
          </label>
        </ValidationProvider>

        <ValidationProvider v-slot="{ classes }" name="Confirmed password" rules="required|confirmed:password">
          <label class="password" :class="classes">
            <input
              v-model="form.field.passwordConfirm" name="passwordConfirm" type="password"
              :placeholder="$t('account.form.confirmPassword')"
            >
          </label>
        </ValidationProvider>
        <label class="msg">
          <i v-for="(unit, i) in errors" v-show="unit[0]" :key="i">{{ unit[0] }}<br></i>
        </label>
        <label class="btn" @click="formSubmit(invalid, validate)">
          <button-purple
            :text="$t('account.register.btnSignUpNow')"
            :font-size="'size-16'" :square="true" :border-radius="6" :loading="ajaxRequesting"
          />
        </label>
      </ValidationObserver>
      <label v-if="!pageIos" class="links-row">
        {{ $t('account.register.link.agree') }}
        <router-link to="/privacy">{{ $t('account.register.link.PrivacyPolicy') }}</router-link>
      </label>
      <label v-if="!(pageIos || pageAff)" class="links-row">
        <router-link to="/login">
          {{ $t('account.register.link.alreadyHave') }}
          {{ $t('account.register.link.LogIn') }}
        </router-link>
      </label>
    </div>

    <transition name="fade">
      <div v-if="dialogSuccess" class="uni-dialog-box enter-box enter-mask">
        <div class="mask"></div>
        <div class="container">
          <i class="close" @click="closeDialog()"></i>
          <div class="content">
            <div class="model-box success">
              <div class="title">
                <i class="icon"></i>
                <h3>{{ $t('global.modelBox.title.success') }}</h3>
              </div>
              <p class="note" v-html="$t('account.successText.registerSuccess')"></p>
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
import apiSelf from '@/api/api.self';

export default {
  name: 'Register',
  components: { ButtonPurple },
  data() {
    return {
      form: {
        field: {
          username: '',
          email: '',
          password: '',
          passwordConfirm: '',
          to: '',
          affiliate_id: ''
        }
      },
      dialogSuccess: false,
      dialogFail: false,
      dialogFailMsg: '',
      ajaxRequesting: false,
      emailProviderGetter: false,
      emailProvider: [],
      pageIos: false,
      pageAff: false,
      productName: this.$store.state.productName
    };
  },
  watch: {
    $route(to) {
      this.pageIos = window.location.hostname !== this.$constant.url.easy;
      this.pageAff = to.name === 'registerAff';
      this.affJump(to);
    }
  },
  mounted() {
    this.identifyKey();
    this.requestEmailLimitList();

    this.pageIos = window.location.hostname !== this.$constant.url.easy;
    this.pageAff = this.$route.name === 'registerAff';
    this.affJump(this.$route);
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
        this.sendRegisterInfo();
      }
      this.ga0();
    },
    sendRegisterInfo() {
      let query = '';
      if (this.COMMON.getURLQuery('utm_source') === 'IOT-PC') {
        query = '-IOT-PC';
      }

      console.log('affID', this.$route.params.id);
      this.ajaxRequesting = true;
      this.axios.post(
        api.register,
        this.COMMON.paramSign(
          {
            user_name: this.form.field.username,
            account: this.form.field.email,
            password: this.form.field.password,
            origin: `web${query}`,
            key: this.$storage.get('registerKey'),
            to: this.form.field.to,
            affiliate_id: this.$route.params.id
          }
        )
      ).then((response) => {
        if (response.data.status === 'ok') {
          this.dialogSuccess = true;

          // if (this.COMMON.getDomain() === this.$constant.url.easyDomain || this.COMMON.envTest()) {
          setTimeout(() => {
            this.login();
          }, 1000);
          // }

        } else {
          if (response.data.error.type === 'account_occupied') {
            this.dialogFailMsg = this.$t('account.errorText.accountOccupied');
          } else if (response.data.error.type === 'bad_account') {
            this.dialogFailMsg = this.$t('account.errorText.badAccountRegister');
          } else {
            this.dialogFailMsg = '<samp>'
              + '<b>Error Type:</b> ' + response.data.error.type
              + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
              + '</samp>';
          }
          this.dialogFail = true;
        }
        this.ajaxRequesting = false;
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.dialogFailMsg = this.$t('account.errorText.failed');
        this.dialogFail = true;
        console.log('Catch Error: sendRegisterInfo');
        console.log(error);
      });
    },
    login() {
      let query = '';
      if (this.COMMON.getURLQuery('utm_source') === 'IOT-PC') {
        query = '-IOT-PC';
      }

      this.ajaxRequesting = true;
      this.axios.post(
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

          // 首次登录判断
          const firstLogin = response.data.user['first_login'];

          // 登录后跳转
          if (firstLogin) {
            // this.$router.push({ path: '/welcome' });

            // if (this.$storage.get('fromBlog') === true)
            //   this.$router.push({ path: '/lucky-draw-test' });
            // else
            //   this.$router.push({ path: '/lucky-draw' });
            this.$router.push({ path: '/user' })


            // this.$router.push({ path: '/followers-giveaway' });
            // AB Test 分流
            // this.COMMON.randomAbTest()
            //   ? this.$router.push({ path: '/followers-giveaway' })
            //   : this.$router.push({ path: '/lucky-draw' });
          } else {
            this.$router.push({ path: `/user${this.$constant.paymentChannel}` });
          }

        } else {
          this.dialogFailMsg = '<samp>'
            + '<b>Error Type:</b> ' + response.data.error.type
            + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
            + '</samp>';
          this.dialogFail = true;
        }
        this.ajaxRequesting = false;
      }).catch((error) => {
        this.ajaxRequesting = false;
        this.dialogFailMsg = this.$t('account.errorText.failed');
        this.dialogFail = true;
        console.log('Catch Error: login');
        console.log(error);
      });
    },
    ga0() {
      this.$ga.event('buttonclick', 'click', 'rgregister');
    },
    identifyKey() {
      const key = this.$storage.get('to');
      if (key === undefined || key === null) {
        this.form.field.to = '';
      } else {
        this.form.field.to = key;
      }
    },
    requestEmailLimitList() {
      this.$nuxt.$axios.get(
        apiSelf.emailLimitList
      ).then((response) => {
        this.emailProvider = response.data['site'];
        this.emailProviderGetter = true;
      }).catch((error) => {
        console.log('Catch Error: requestEmailLimitList', error);
      });
    },

    affJump(to) {
      console.log(to);
      if (
        this.pageAff
        && to.params.id
        && this.COMMON.isiOS()
      ) {
        const url = `https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=AFF${to.params.id}&mt=8`;
        console.log('Aff URL:', url);
        location.href = url;
        setTimeout(() => {
          this.$router.push({ path: '/' });
        }, 3000);
      }
    }
  }
};
</script>

<style lang="scss" scoped src="./login-register.scss"></style>
