<template>
  <div v-if="!routerClient" id="header" class="header-nav__navigator"
       :class="{ 'home': homePath && homeScroll && !loginStatus }"
  >
    <div v-if="!routeUserCenter&&!routerPayment" class="header-nav__wrapper">
      <div class="wrapper">
        <div class="header-nav__logo">
          <a id="nav-home" @click="routerPush('/')">
            <i v-if="$store.state.productName === 'GetInsta'"></i>
            <img v-if="$store.state.productName !== 'GetInsta'" :src="$store.state.productLogo" alt="logo">
            <span>{{ $store.state.productName }}</span>
          </a>
        </div>
        <div v-if="!ptPage" class="header-nav__menu">
          <div class="pc">
            <a
              id="nav-menu-00" class="header-nav__menu_links"
              @click="routerPush('/')"
            >{{ $t('global.header.menu.home') }}</a>
            <a
              v-if="!storeMenuHide" id="nav-menu-01"
              class="header-nav__menu_links drop-menu"
            >
              <span>{{ $t('global.header.menu.store') }}</span>
              <i></i>

              <div class="drop-menu-container" style="left: -120px">
                <nuxt-link to="/buy-instagram-followers">Buy Instagram Followers</nuxt-link>
                <!-- 分流 -->
                <!-- <a @click="getAutoBuy">Buy Auto Instagram Followers</a> -->
                <nuxt-link to="/buy-auto-instagram-followers">Buy Auto Instagram Followers</nuxt-link>
                <nuxt-link :to="{path:'/buy-instagram-daily-likes',query:{anchor}}">Buy Auto Instagram Likes</nuxt-link>
                <nuxt-link to="/buy-instagram-likes">Buy Instagram Likes</nuxt-link>
              </div>
            </a>
            <a
              v-if="$i18n.locale === 'en'"
              id="nav-menu-02" class="header-nav__menu_links"
              @click="routerPush('/get-instagram-followers-likes')"
            >{{ $t('global.header.menu.get') }}</a>
            <a
              v-if="$i18n.locale !== 'en'"
              id="nav-menu-03" class="header-nav__menu_links"
              @click="routerPush('/faqs')"
            >{{ $t('global.header.menu.faq') }}</a>
            <!--Free Tools-->
            <div
              v-if="$i18n.locale === 'en'"
              class="header-nav__menu_links drop-menu"
            >
              <span>Free Tools</span>
              <i></i>

              <div class="drop-menu-container" style="left: -100px">
                <nuxt-link to="/instagram-video-downloader">Instagram Video Downloader</nuxt-link>
                <nuxt-link to="/the-most-followed-instagram">Instagram Ranking Tool</nuxt-link>
                <nuxt-link to="/instagram-name-generator">Instagram Name Generator</nuxt-link>
              </div>
            </div>
            <a
              id="nav-menu-04" class="header-nav__menu_links"
              @click="routerPush('/blogs')"
            >{{ $t('global.header.menu.blog') }}</a>
            <a
              v-if="$i18n.locale === 'en'"
              class="header-nav__menu_links"
              @click="routerPush('/affiliate-solutions')"
            >Affiliates</a>
          </div>
          <nuxt-link
            v-if="$store.state.cartLength > 0"
            to="/checkout" class="cart"
            :title="$t('global.header.button.cart')"
          >
            <i class="cart"></i>
          </nuxt-link>
          <a
            v-if="$i18n.locale === 'en' && !loginStatus && loginBtnShow"
            id="nav-menu-05"
            class="header-nav__btn-container"
            href="javascript:"
            @click="gaHeaderBtn"
          >
            <ButtonPurple
              class="pc"
              :text="headerBtnText"
              :font-size="'header-small'"
              :shadow="false"
            />
            <button-white
              class="mobile"
              :text="headerBtnText"
              :font-size="'header-small'"
              :white="homePath && homeScroll && !loginStatus"
            />
          </a>
          <a
            v-if="$i18n.locale !== 'en'"
            id="nav-menu-06"
            class="header-nav__btn-container pc"
            :class="{ 'minor-lang': $i18n.locale !== 'en' }"
            href="javascript:"
            @click="goPageStore"
          >
            <ButtonPurple
              class="pc"
              :text="$t('global.header.button.buyNow')"
              :font-size="'header-small'"
              :shadow="false"
            />
          </a>
          <a
            v-if="$i18n.locale === 'de' && $store.state.isAndroid"
            class="header-nav__btn-container de"
            href="javascript:"
            @click="gaDownloadDe"
          >
            <button-white
              class="mobile"
              text="installieren"
              :font-size="'header-small'"
              :white="homePath && homeScroll && !loginStatus"
            />
          </a>
          <a
            v-if="$i18n.locale === 'de' && $store.state.isiOS"
            class="header-nav__icon-container"
            href="javascript:"
            @click="gaDownloadDe"
          >
            <i class="download"></i>
          </a>
          <div
            v-if="$i18n.locale === 'en' && loginStatus"
            class="header-nav_menu_user"
            title="User Center"
          >
            <nuxt-link
              :to="`/user${$nuxt.$constant.paymentChannel}`"
              class="avatar-container"
            >
              <div class="avatar">
                <img :src="$store.state.userAvatar" alt="avatar">
              </div>
            </nuxt-link>
          </div>
        </div>
        <div v-if="ptPage" class="header-nav__menu">
          <a class="header-nav__btn-container pt pc" href="javascript:" @click="gaPtBtn">
            <button-white-blue text="Baixar para PC" :white="false" :font-size="'header-small'" />
          </a>
        </div>
        <div class="header-nav__btn mobile">
          <i class="open" @click="switchMenu"></i>
        </div>
      </div>
    </div>

    <div v-if="routeUserCenter&&!routerPayment" class="header-nav__wrapper header-nav__logged">
      <div class="header-nav__logged_logo">
        <nuxt-link to="/">GetInsta</nuxt-link>
      </div>
      <div class="header-nav__logged_user pc">
        <div v-if="!routeWelcome" class="header-nav__logged_user_container">
          <i class="download" @click="downloadHeaderPC">
            <button-download-windows-yellow :size="'header'" />
          </i>
          <nuxt-link
            v-if="$store.state.cartLength > 0"
            to="/checkout"
            class="cart"
            :title="$t('global.header.button.cart')"
          >
            <i class="cart"></i>
          </nuxt-link>
          <span class="username">{{ $store.state.userName }}</span>
          <!--<span class="coins">{{ $store.state.userCoins }}</span>-->
          <!--<i class="coin-icon"></i>-->
        </div>
        <div v-if="routeWelcome">
          <nuxt-link :to="`/user${$nuxt.$constant.paymentChannel}`" class="avatar-container" title="User Center">
            <div class="avatar">
              <img :src="$store.state.userAvatar" alt="avatar">
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="header-nav__logged_user mobile">
        <nuxt-link
          v-if="$store.state.cartLength > 0"
          to="/checkout"
          class="cart"
          :title="$t('global.header.button.cart')"
        >
          <i class="cart"></i>
        </nuxt-link>
        <div class="avatar" @click="routeToUserCenter">
          <img :src="$store.state.userAvatar" alt="">
        </div>
      </div>
      <div class="header-nav__btn">
        <i class="open" @click="switchMenu"></i>
      </div>
    </div>

    <div v-if="routerPayment" class="header-nav__wrapper header-nav__logged">
      <div class="header-nav__logged_logo">
        <span>{{ paymentTitle }}</span>
      </div>
      <div v-if="!routerIOT" class="header-nav__logged_user">
        <div v-if="$route.path!=='/checkout'"
             class="btn-container"
             :class="{
               'white-0': paymentHeaderBtnText === $t('global.header.button.BackHome'),
               'white-1': paymentHeaderBtnText === 'OK'
             }"
             @click="paymentHeaderBtnJump"
        >
          <button-white :text="paymentHeaderBtnText" :white="false" :font-size="'header-small'" />
        </div>
      </div>
      <div v-if="!routerIOT" class="header-nav__btn">
        <i :class="{
             'back': $nuxt.$route.path === '/checkout' || $nuxt.$route.path === '/order-fail',
             'home': $nuxt.$route.path === '/order-detail'|| $nuxt.$route.path === '/thank-you'
           }"
           @click="goBack"
        ></i>
      </div>
    </div>

    <!--header-sidebar-mask-->
    <div
      v-if="sideBarStatus" class="header-nav__logged_content_mask"
      :style="{ width: `${windowWidth}px`, height: `${windowHeight}px` }"
      @click="switchMenu"
    ></div>
    <!--header-sidebar-->
    <transition name="header-slide">
      <div v-if="sideBarStatus" class="header-nav__logged_content" :style="{ height: `${windowHeight}px` }">
        <i class="close" @click="switchMenu"></i>
        <div class="header-nav__logged_content_container">
          <div v-if="loginStatus" class="avatar mobile">
            <nuxt-link
              :to="`/user${$nuxt.$constant.paymentChannel}`"
              @click.native="menuOff"
            >
              <img :src="$store.state.userAvatar" alt="avatar">
            </nuxt-link>
          </div>
          <nuxt-link
            to="/"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            {{ $t('global.header.menu.home') }}
          </nuxt-link>
          <nuxt-link
            v-if="!storeMenuHide" to="/buy-instagram-followers"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            {{ $t('global.header.menu.buyFollowers') }}
          </nuxt-link>
          <nuxt-link
            to="/buy-auto-instagram-followers"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            Buy Auto Instagram Followers
          </nuxt-link>
          <nuxt-link
            v-if="!storeMenuHide" :to="{path:'/buy-instagram-daily-likes',query:{anchor}}"
            class="header-nav__logged_content_link"
            @click.native="menuOff"
          >
            Buy Auto Instagram Likes
          </nuxt-link>
          <nuxt-link
            v-if="!storeMenuHide" to="/buy-instagram-likes"
            class="header-nav__logged_content_link"
            @click.native="menuOff"
          >
            {{ $t('global.header.menu.buyLikes') }}
          </nuxt-link>

          <nuxt-link
            to="/blogs"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            {{ $t('global.header.menu.blog') }}
          </nuxt-link>
          <nuxt-link
            v-if="$i18n.locale === 'en'" to="/get-instagram-followers-likes"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            {{ $t('global.header.menu.get') }}
          </nuxt-link>
          <nuxt-link
            v-if="$i18n.locale === 'en'"
            to="/affiliate-solutions"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            Affiliate Program
          </nuxt-link>
          <nuxt-link
            v-if="$i18n.locale === 'en'"
            to="/instagram-video-downloader"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            Instagram Video Downloader
          </nuxt-link>
          <nuxt-link
            v-if="$i18n.locale === 'en'"
            to="/the-most-followed-instagram"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            Instagram Ranking Tool
          </nuxt-link>
          <nuxt-link
            v-if="$i18n.locale === 'en'"
            to="/instagram-name-generator"
            class="header-nav__logged_content_link" @click.native="menuOff"
          >
            Instagram Name Generator
          </nuxt-link>
          <a
            v-if="$i18n.locale === 'en' && loginStatus"
            class="header-nav__logged_content_link"
            @click="logout"
          >
            {{ $t('global.header.button.logout') }}
          </a>
        </div>
        <div v-if="$i18n.locale === 'en'" class="btn mobile">
          <div v-if="!loginStatus" class="btn-container single">
            <nuxt-link to="/login" @click.native="menuOff">
              <button-white text="Log In" :white="false" :font-size="'sidebar-small'" />
            </nuxt-link>
          </div>
          <!--<div v-if="loginStatus" class="btn-container double">-->
          <!--  <div class="btn-logged">-->
          <!--    <nuxt-link :to="`/user${$nuxt.$constant.paymentChannel}`" @click.native="menuOff">-->
          <!--      <button-white text="Get Followers" :white="false" :font-size="'sidebar-small'" />-->
          <!--    </nuxt-link>-->
          <!--  </div>-->
          <!--  <div class="btn-logged">-->
          <!--    <nuxt-link :to="`/user${$nuxt.$constant.paymentChannel}`" @click.native="menuOff">-->
          <!--      <button-white text="Get Likes" :white="false" :font-size="'sidebar-small'" />-->
          <!--    </nuxt-link>-->
          <!--  </div>-->
          <!--</div>-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

import ButtonPurple from '@/components/button/button-purple';
import ButtonYellowDownload from '@/components/button/button-yellow-download';
import ButtonWhite from '@/components/button/button-white';
import defaultAvatar from '@/assets/images/global/icon_avatar_default.svg';
import ButtonWhiteBlue from '@/components/button/button-white-blue';
import ButtonDownloadWindowsYellow from '@/components/button/button-download-windows-yellow';

export default {
  name: 'HeaderNav',
  directives: {
    ClickOutside
  },
  components: {
    ButtonDownloadWindowsYellow,
    ButtonWhiteBlue,
    ButtonWhite,
    // ButtonYellowDownload,
    ButtonPurple
  },
  props: {
    homePath: {
      type: Boolean,
      default: false,
      required: true
    },
    homeScroll: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data() {
    return {
      anchor: 'tab',
      windowWidth: document.body.clientWidth,
      windowHeight: document.body.clientHeight,
      sideBarStatus: false,
      headerBtnPath: '/login',
      headerBtnText: 'Log In',
      loginBtnShow: true,
      gaHeaderBtnLabel: '',
      gaHeaderBtnDownloadLabel: '',
      ptPage: false,

      routeUserCenter: false,
      routeWelcome: false,
      routerPayment: false,
      routerClient: false,
      storeMenuHide: false,
      routerIOT: false
    };
  },
  computed: {
    loginStatus() {
      return this.$store.state.loginStatus;
    },
    paymentTitle() {
      let path = this.$nuxt.$route.path;
      let text = '';
      if (path === '/checkout') {
        text = this.$t('global.header.title.Checkout');
      } else if (path === '/order-detail') {
        text = this.$t('global.header.title.OrderComplete');
      } else if (path === '/thank-you') {
        text = this.$t('global.header.title.OrderComplete');
      } else if (path === '/order-fail') {
        text = this.$t('global.header.title.Payment');
      } else {
        text = this.$t('global.header.title.Payment');
      }
      return text;
    },
    paymentHeaderBtnText() {
      let path = this.$nuxt.$route.path;
      let text = '';
      if (path === '/order-detail') {
        // text = 'OK';
        text = this.$t('global.header.button.BackHome');
      } else if (path === '/order-fail') {
        text = this.$t('global.header.button.BackHome');
      } else {
        text = this.$t('global.header.button.BackHome');
      }
      return text;
    }
  },
  watch: {
    $route(to) {
      this.routeUserCenter = to.path === '/user'
        || to.path === '/user-get-followers'
        || to.path === '/user-get-likes'
        || to.path === '/user-asknet'
        || to.path === '/user-get-followers-asknet'
        || to.path === '/user-get-likes-asknet'
        || to.path === '/welcome';
      this.ptPage = to.path === '/pt/get-instagram-followers';

      this.routeWelcome = to.path === '/welcome';

      this.routerPayment
        = to.path === '/checkout'
        || to.path === '/order-detail'
        || to.path === '/thank-you'
        || to.path === '/order-fail'
        || to.path === '/order-fail-2';

      this.routerIOT = window.location.hostname === 'www.iotransfer.net';
      this.routerClient
        = this.COMMON.getURLQuery('url_cart') !== null
        && this.COMMON.getURLQuery('url_cart') !== '0'
        && this.COMMON.isMobile();

      if (to.path === '/login' || to.path === '/register') {
        if (this.$store.state.loginStatus) {
          this.$nuxt.$router.push({ path: `/user${$nuxt.$constant.paymentChannel}` });
        }
      }

      if (to.path === '/login') {
        this.headerBtnPath = '/register';
        this.headerBtnText = 'Sign Up';
      } else {
        this.headerBtnPath = '/login';
        this.headerBtnText = 'Log In';
      }

      this.loginBtnShow = to.path !== '/event-dl';

      //gaHeaderBtnDownloadLabel
      if (to.path === `/user${$nuxt.$constant.paymentChannel}`) {
        this.gaHeaderBtnDownloadLabel = '';
      } else if (to.path === `/user-get-followers${$nuxt.$constant.paymentChannel}`) {
        this.gaHeaderBtnDownloadLabel = '-f';
      } else if (to.path === `/user-get-likes${$nuxt.$constant.paymentChannel}`) {
        this.gaHeaderBtnDownloadLabel = '-l';
      }

      this.storeMenuHide
        = (
          this.COMMON.getURLQuery('source') === 'google'
          && this.COMMON.isiOS()
        )
        || (
          this.COMMON.getURLQuery('s') === 'tiktok'
          && this.COMMON.isiOS()
        );
    }
  },
  mounted() {
    this.getLoginStatusFromStorage();
  },
  methods: {
    switchMenu() {
      this.windowWidth = document.body.clientWidth;
      this.windowHeight = document.body.clientHeight;
      this.sideBarStatus = !this.sideBarStatus;
      this.documentElementSet();
    },
    documentElementSet() {
      if (this.sideBarStatus) {
        document.documentElement.classList.add('no-scroll');
      } else {
        document.documentElement.classList.remove('no-scroll');
      }
    },
    menuOff() {
      this.sideBarStatus = false;
      this.documentElementSet();
    },
    goBack() {
      let path = this.$nuxt.$route.path;
      if (path === '/checkout' || path === '/order-fail') {
        this.$router.go(-1);
      } else {
        this.$nuxt.$router.push({ path: '/' });
      }
    },
    logout() {
      this.sideBarStatus = false;
      this.documentElementSet();
      this.renderHeaderAvatar(defaultAvatar);
      this.$store.commit('loginChange', false);
      this.$router.replace({ path: '/login' });

      this.menuOff();
    },
    getLoginStatusFromStorage: function () {
      const hasTest = this.$storage.has('loginStatus');
      const login = hasTest ? this.$storage.get('loginStatus') : false;
      if (!login) this.renderHeaderAvatar(defaultAvatar);
      this.$store.commit('loginChange', login);
    },
    renderHeaderAvatar(avatar) {
      this.$storage.set('userAvatar', avatar);
      this.$store.commit('userAvatar', avatar);
    },
    gaHeaderBtn() {
      // header BTN GA 设置
      const to = this.$route;
      if (to.path === '/') {
        this.gaHeaderBtnLabel = 'hp';
      } else if (to.path === '/get-instagram-followers-likes') {
        this.gaHeaderBtnLabel = 'get';
      } else if (to.path === '/faqs') {
        this.gaHeaderBtnLabel = 'faq';
      } else if (to.path === '/feedback') {
        this.gaHeaderBtnLabel = 'feedback';
      } else if (to.path === '/blogs') {
        this.gaHeaderBtnLabel = 'blogs';
      } else if (to.name === 'blog-detail') {
        this.gaHeaderBtnLabel = `blog-${this.$store.state.blogID}`;
      } else if (to.path === '/register') {
        this.gaHeaderBtnLabel = 'signup';
      } else if (to.path === '/terms') {
        this.gaHeaderBtnLabel = `terms`;
      } else if (to.path === '/privacy') {
        this.gaHeaderBtnLabel = `privacy`;
      } else if (to.path === '/forgot') {
        this.gaHeaderBtnLabel = `forgot`;
      } else if (to.path === '/user-reset') {
        this.gaHeaderBtnLabel = `reset`;
      } else if (to.path === '/user-reset') {
        this.gaHeaderBtnLabel = `reset`;
      } else if (to.name === 'download') {
        this.gaHeaderBtnLabel = `dl`;
      } else if (to.name === '404') {
        this.gaHeaderBtnLabel = `404`;
      } else {
        this.gaHeaderBtnLabel = `other`;
      }
      // console.log(this.gaHeaderBtnLabel);

      // console.log(this.headerBtnPath);
      if (this.headerBtnPath === '/login') {
        // this.$nextTick(function () {
        this.$ga.event('inslogin', 'login', `login-${this.gaHeaderBtnLabel}`);
        // });
      } else {
        this.$ga.event('insrg', 'register', 'lisignup');
      }

      // UTM参数
      let query = {};
      if (this.COMMON.getURLQuery('utm_source') === 'IOT-PC') {
        query = { utm_source: 'IOT-PC' };
      }

      this.$nuxt.$router.push({ path: this.headerBtnPath, query: query });
    },
    downloadHeaderPC() {
      this.$ga.event('insdl', 'download', `usermanagewindl${this.gaHeaderBtnDownloadLabel}`);
      window.location.href = 'https://www.easygetinsta.com/downloadpc';
    },
    gaPtBtn() {
      this.$ga.event('insdl', 'download', `pthpwindl-header`);
      window.location.href = 'https://www.easygetinsta.com/downloadpc';
    },
    routeToUserCenter() {
      if (this.routeWelcome) {
        this.$nuxt.$router.push({ path: `/user${$nuxt.$constant.paymentChannel}` });
      }
    },
    paymentHeaderBtnJump() {
      let langDash = this.$i18n.locale !== 'en' ? '-' : '';
      if (this.$nuxt.$route.path === '/order-detail') {
        // this.$nuxt.$router.push({ path: '/user' });
        this.$ga.event('buttonclick', 'click', `tkpageback${langDash}${this.$i18n.locale}`);
        this.$nuxt.$router.push({ path: '/' });
      } else if (this.$nuxt.$route.path === '/order-fail') {
        this.$ga.event('buttonclick', 'click', `failpageback${langDash}${this.$i18n.locale}`);
        this.$nuxt.$router.push({ path: '/' });
      } else {
        this.$nuxt.$router.push({ path: '/' });
      }
    },
    routerPush(path) {
      if (path === this.$nuxt.$route.path) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        this.$nuxt.$router.push({ path: path });
      }
      return false;
    },

    goPageStore() {
      this.$ga.event('insbuy', 'buy', `hphunter-${this.$i18n.locale}`);
      this.$nuxt.$router.push(
        {
          path: '/buy-instagram-followers',
          query: {
            'utm_source': 'PC',
            'utm_medium': 'homepagehunter'
          }
        });
    },
    gaDownloadDe() {
      let platform = '', link = '';
      if (this.COMMON.isAndroid()) {
        platform = 'adr';
        link = this.$store.state.minorLangAdrLink;
      }
      if (this.COMMON.isiOS()) {
        platform = 'ios';
        link = this.$store.state.minorLangIosLink;
      }

      this.$ga.event('insdl', 'download', `head${platform}-de`);
      location.href = link;
    },

    // suto-buy-分流
    getAutoBuy() {
      if (this.COMMON.randomAbTest()) {
        if (this.$nuxt.$route.path !== '/buy-auto-instagram-followers')
          this.$nuxt.$router.push('/buy-auto-instagram-followers');
      } else {
        if (this.$nuxt.$route.path !== '/buy-auto-instagram-followers-1')
          this.$nuxt.$router.push('/buy-auto-instagram-followers-1');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header-nav__navigator {
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.6s;

  .wrapper {
    height: 100%;
    @include clear-fix;
  }

  &.home {
    background-color: transparent;
    box-shadow: none;

    .header-nav__logo {
      span {
        color: #ffffff;
      }
    }

    .header-nav__menu {
      .header-nav__menu_links {
        color: #fff;

        &.drop-menu {
          span {
            color: #fff;
          }

          i {
            &:before, &:after {
              background-color: #fff;
            }
          }
        }

        &:after {
          background-color: #fff;
        }
      }

      i.cart {
        background-image: url("~@/assets/images/global/icon__cart_white.svg");
      }
    }
  }

  .header-nav__wrapper {
    height: 100%;
  }

  .header-nav__logo {
    float: left;
    height: 100%;

    a {
      display: inline-block;
      height: 100%;
    }

    i, img {
      margin-right: 16px;
      display: inline-block;
      width: 32px;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      vertical-align: top;
    }

    i {
      position: relative;
      background-image: url("~@/assets/images/global/logo-outline.svg");

      &.getinshot {
        background-image: url("~@/assets/images/global/logo_getinshot.svg");
      }
    }

    img {
      object-fit: contain;
    }

    span {
      font: 800 italic 28px/80px Montserrat;
      color: #005FFF;
      transition: all 0.3s;
    }
  }

  .header-nav__menu {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;

    .header-nav__menu_links {
      margin-left: 48px;
      display: inline-block;

      position: relative;
      //display: inline-block;
      //max-width: 138px;
      font: 600 16px Montserrat;
      color: #2128BD;
      transition: all 0.3s;
      //@include text-ellipsis;

      &:after {
        position: absolute;
        bottom: -4px;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 4px;
        background-color: #2128BD;
        content: "";
        transform: scaleX(0);
        transform-origin: left center;
        transition: all 0.3s;
      }

      &:hover {
        &:after {
          transform: scaleX(1);
        }
      }

      &.drop-menu {
        &:hover {
          &:after {
            transform: scaleX(0);
          }

          i {
            &:before {
              transform: rotate(-45deg);
            }

            &:after {
              transform: rotate(45deg);
            }
          }

          .drop-menu-container {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }

        span {
          font: 600 16px Montserrat;
          color: #2128BD;
          transition: all 0.3s;
        }

        i {
          margin-left: 8px;
          position: relative;
          display: inline-block;
          width: 7px;
          height: 4px;
          vertical-align: middle;

          &:before, &:after {
            position: absolute;
            top: 0;
            content: "";
            width: 6px;
            height: 2px;
            background-color: #2128BD;
            transition: all 0.3s;
          }

          &:before {
            left: 0;
            transform: rotate(45deg);
          }

          &:after {
            left: 4px;
            transform: rotate(-45deg);
          }
        }
      }

      .drop-menu-container {
        position: absolute;
        top: 40px;
        left: -100%;
        padding: 20px 0;
        background-color: #fff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border: 1px solid #E3E3E3;
        border-radius: 14px;
        cursor: default;

        opacity: 0;
        transform: translateY(-18px) scaleY(0);
        transform-origin: top center;
        transition: all 0.5s cubic-bezier(0.76, 0, 0.24, 1);

        &:before, &:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
        }

        &:before {
          top: -14px;
          display: block;
          width: 27px;
          height: 14px;
          background: url("~@/assets/images/global/header/drop-menu__arrow.svg") center no-repeat;
          background-size: contain;
          filter: drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.16));
        }

        &:after {
          top: -30px;
          width: 40%;
          height: 30px;
        }

        a {
          margin: 0;
          padding: 0 24px;
          display: block;
          font: 600 16px Montserrat;
          color: #2A2A2A;
          line-height: 48px;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background-color: #E8E8E8;
          }
        }
      }
    }

    .header-nav__btn-container {
      width: 100px;
      height: 40px;

      &.pt {
        width: 162px;
        height: 40px;
      }

      &.minor-lang {
        width: 214px;
      }
    }

    .header-nav_menu_user {
      margin-left: 48px;
      width: 48px;
      height: 48px;
      cursor: pointer;

      .avatar-container {
        margin-left: 0;
        width: 100%;
        height: 100%;
      }

      .avatar {
        height: 100%;
        border: 3px solid #fff;
        box-shadow: 0 0 6px #00000029;
        border-radius: 50%;
        transition: all 0.3s;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        &:hover {
          border-color: #005fff;
        }
      }
    }
  }

  .header-nav__btn {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    height: 100%;

    &.right {
      left: auto;
      right: 0;
    }

    i {
      display: block;
      width: 106px;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      cursor: pointer;
      transition: all 0.3s;

      &.open {
        background-image: url("~@/assets/images/global/header/icon_menu_open.svg");
        background-size: 36px 12px;
      }

      &.back {
        background-image: url("~@/assets/images/global/header/icon_menu_back.svg");
        background-size: 24px 24px;
      }

      &.home {
        background-image: url("~@/assets/images/global/header/icon_menu_home.svg");
        background-size: 28px 24px;
      }

      &.download {
        background-image: url("~@/assets/images/global/icon__download_app-store.svg");
        background-size: 22px 20px;
      }
    }
  }

  .header-nav__logged {
    position: relative;

    .header-nav__logged_logo {
      width: 100%;
      height: 100%;
      text-align: center;

      a, span {
        font: 900 italic 28px/80px Montserrat;
        color: #005FFF;
      }
    }

    .header-nav__logged_user {
      position: absolute;
      z-index: 100;
      top: 0;
      right: 32px;
      display: flex;
      align-items: center;
      height: 100%;

      .header-nav__logged_user_container {
        display: flex;
        align-items: center;
      }

      i.download {
        margin-right: 30px;
        display: inline-block;
        width: 158px;
        //height: 40px;
      }

      span {
        margin: 0 4px;
        font: 600 16px/19px Montserrat;

        &.username {
          color: #2A2A2A;
        }

        &.coins {
          font: 600 16px/19px Montserrat;
          color: #FF6F00;
          /*cursor: pointer;*/
        }
      }

      i.coin-icon {
        margin-left: 8px;
        display: inline-block;
        width: 32px;
        height: 32px;
        background: url("~@/assets/images/global/icon_coin.svg") no-repeat center;
        background-size: contain;
        vertical-align: middle;
      }

      .avatar-container {
        .avatar {
          width: 48px;
          height: 48px;
          border: 3px solid #fff;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
          border-radius: 50%;
          transition: all 0.3s;

          &:hover {
            border-color: #005fff;
          }

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
        }
      }

      .btn-container {
        display: inline-block;
        height: 40px;

        &.white-0 {
          width: 120px;
        }

        &.white-1 {
          width: 86px;
        }
      }

      a.cart {
        margin-left: 18px;
        margin-right: 24px;
      }
    }
  }

  .header-nav__logged_content_mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 199;
    width: 100%;
    height: 100%;
  }

  .header-nav__logged_content {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    width: 300px;
    background-color: #fff;
    box-shadow: 3px 0 10px #0000001A;

    i.close {
      display: block;
      width: 106px;
      height: 84px;
      background: url("~@/assets/images/global/header/icon_menu_close.svg") no-repeat center;
      background-size: 28px 28px;
      cursor: pointer;
    }

    a.header-nav__logged_content_link {
      margin-top: 20px;
      display: block;
      width: 100%;
      height: 60px;
      background-color: transparent;
      font: 500 16px/60px Montserrat;
      color: #2A2A2A;
      text-align: center;
      transition: all 0.3s;

      &:hover {
        background-color: #005FFF;
        color: #fff;
      }
    }

    .avatar {
      margin: 0 auto;
      width: 84px;
      height: 84px;
      padding: 1px;
      border: 1px solid #00000029;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .btn {
      margin-top: 65px;

      .btn-container {
        &.single {
          padding: 0 14%;
        }

        &.double {
          padding: 0 4%;
        }

        width: 100%;
        height: 50px;

        a {
          display: inline-block;
          width: 100%;
          height: 100%;
        }

        .btn-logged {
          margin-top: 32px;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  a.cart {
    display: inline-block;

    i.cart {
      display: inline-block;
      width: 28px;
      height: 28px;
      background: url("~@/assets/images/global/icon__cart_black.svg") no-repeat center;
      background-size: contain;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.7;
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }

  &.marry-christmas {
    .header-nav__wrapper {
      .header-nav__logo {
        i:after {
          position: absolute;
          top: 9px;
          right: -9px;
          content: "";
          display: block;
          width: 31px;
          height: 30px;
          background: url("~@/assets/images/global/header/icon_menu_christmas-hat.svg") center no-repeat;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .header-nav__navigator {
    height: (88px/2);

    &.home {
      background-color: rgba(255, 255, 255, 0.13);
      backdrop-filter: blur(3px);

      .header-nav__btn {
        i {
          filter: invert(100%);
        }
      }

      .header-nav__icon-container {
        i {
          filter: invert(100%);
        }
      }
    }

    .header-nav__logo {
      float: none;
      width: 100%;
      text-align: center;

      i, img {
        display: none;
      }

      span {
        color: #2A2A2A;
        line-height: (88px/2);
        font-size: (32px/2);
      }
    }

    .header-nav__menu {
      position: absolute;
      top: 0;
      right: (30px/2);

      .header-nav__btn-container {
        margin-left: 0;
        width: (126px/2);
        height: (56px/2);

        &.pt {
          width: (162px/2);
          height: (56px/2);
        }

        &.de {
          width: 92px;
        }
      }

      .header-nav_menu_user {
        margin-left: 0;
        width: 28px;
        height: 28px;

        .avatar-container {
          margin-left: 0;
          width: 100%;
          height: 100%;
        }

        .avatar {
          border-width: 1.5px;
        }
      }

      .header-nav__icon-container {
        margin-left: -16px;
        position: relative;
        right: -15px;
        width: 52px;
        height: 100%;

        i {
          display: block;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-position: center;
          cursor: pointer;
          transition: all 0.3s;

          &.download {
            background-image: url("~@/assets/images/global/icon__download_app-store.svg");
            background-size: 22px 20px;
          }
        }
      }
    }

    .header-nav__btn {
      i {
        width: (106px/2);
        height: 100%;

        &.open {
          background-size: (36px/2) (12px/2);
        }

        &.back {
          background-size: (28px/2) (30px/2);
        }

        &.home {
          background-size: (32px/2) (32px/2);
        }
      }
    }

    .header-nav__logged {
      .header-nav__logged_logo {
        a, span {
          font-size: 16px;
          line-height: 44px;
        }
      }

      .header-nav__logged_user {
        right: 15px;

        .btn {
          width: (126px/2);
          height: (56px/2);
        }

        .avatar {
          width: (56px/2);
          height: (56px/2);
          border: (3px/2) solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 6px #00000029;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        .btn-container {
          height: 28px;

          &.white-0 {
            width: 90px;
          }

          &.white-1 {
            width: 50px;
          }
        }

        a.cart {
          margin-left: 0;
          margin-right: 16px;
        }
      }
    }

    .header-nav__logged_content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 44px 0 (56+40px);
      width: 100%;

      i.close {
        position: absolute;
        left: 0;
        top: 0;
        width: 53px;
        height: 42px;
        background-size: 14px 14px;
      }

      a.header-nav__logged_content_link {
        margin-top: 10px;
        height: (112px/2);
        font: 500 16px/56px Montserrat;
      }

      .avatar {
        margin-bottom: (40px/2);
        width: (148px/2);
        height: (148px/2);
      }

      .btn {
        margin-top: 0;
        position: absolute;
        bottom: (78px/2);
        left: 0;
        width: 100%;

        .btn-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: (112px/2);

          .btn-logged {
            margin-top: 0;
            width: 48%;
            height: 100%;
          }
        }
      }

      .header-nav__logged_content_container {
        padding: 20px 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }

    a.cart {
      margin-right: 16px;
      display: inline-block;

      i.cart {
        width: 20px;
        height: 20px;
      }
    }

    &.marry-christmas {
      .header-nav__wrapper {
        .header-nav__logo {
          i:after {
            display: none;
          }
        }
      }
    }
  }
}
</style>
