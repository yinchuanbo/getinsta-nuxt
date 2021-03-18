<template>
  <div ref="mark" :class="{ 'on': animateBegin }" class="home-1-steps home__sec">
    <div class="wrapper">
      <h2
        v-if="!($i18n.locale === 'de' && $store.state.isiOS)"
        class="home__sec_h2 step-0"
      >
        {{ $t('home.home-1.title') }}
      </h2>
      <h2
        v-if="$i18n.locale === 'de' && $store.state.isiOS"
        class="home__sec_h2 step-0"
      >
        {{ $t('home.home-1.title-ios') }}
      </h2>
      <p class="home__sec_p step-1">
        {{ $t('home.home-1.subtitle0') }} {{ $store.state.productName }} {{ $t('home.home-1.subtitle1') }}
      </p>

      <div class="home-1-steps-de__steps-container step-1">
        <div class="home-1-steps-de__steps-container_wrapper">
          <div v-for="(unit, i) in dataList" :key="i" class="unit">
            <img :src="unit.img" alt="screenshot">
            <hr>
            <div class="index-container">
              <span>Schritt {{ i + 1 }}</span>
            </div>
            <p>{{ unit.text }}</p>
          </div>
        </div>
      </div>

      <!--btn GetFreeFollowers&LikesNow PC-->
      <div v-if="!pageIOS && $i18n.locale === 'en'" class="home-1-steps__btn-container pc step-5" @click="ga0">
        <router-link to="/login">
          <button-purple :text="$t('home.home-1.btn.GetFreeFollowers&LikesNow')" />
        </router-link>
      </div>

      <!--btn GetFreeFollowers&LikesNow PC-->
      <div v-if="!pageIOS && $i18n.locale !== 'en'" class="home-1-steps__btn-container pc step-5" @click="ga00">
        <a href="javascript:">
          <button-purple :text="$t('home.home-1.btn.GetFreeFollowers&LikesNow')" />
        </a>
      </div>

      <!--btn DownloadFor Mobile-->
      <div
        v-if="!$store.state.hideIosMinorLang || $store.state.isAndroid"
        class="home-1-steps__btn-container mobile step-5" @click="downloadMultiLang"
      >
        <button-purple
          :text="$store.state.isiOS ?
            $t('home.home-1.btn.DownloadForIphone') : $t('home.home-1.btn.DownloadForAndroid')"
          :icon="$store.state.isiOS ? 'ios' : 'android'"
        />
      </div>

      <!--btn BuyNow-->
      <div
        v-if="!buyNowBtnHide && $i18n.locale === 'en'"
        class="home-1-steps__btn-container second step-5"
        @click="ga01"
      >
        <button-buy-now :text="$t('home.home-1.btn.BuyNow')" />
      </div>
      <div
        v-if="$i18n.locale !== 'en' && !minorLangHide"
        class="home-1-steps__btn-container second step-5"
        @click="ga01"
      >
        <button-buy-now :text="$t('home.home-1.btn.BuyNow')" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '../global/button/button-purple';
import ButtonBuyNow from '@/components/button/button-buy-now';

//img
import img0 from '@/assets/images/home/home-3-steps-de/home-3-steps__a.png';
import img1 from '@/assets/images/home/home-3-steps-de/home-3-steps__b.png';
import img2 from '@/assets/images/home/home-3-steps-de/home-3-steps__c.png';

export default {
  name: 'Home1StepsDe',
  components: {
    ButtonBuyNow,
    ButtonPurple
  },
  data() {
    return {
      animateBegin: false,
      buyNowBtnHide: false,
      pageIOS: false,
      dataList: [
        {
          img: img0,
          text: 'App im App Store laden'
        },
        {
          img: img1,
          text: 'Melden Sie sich mit Ihrem Instagram-Konto an'
        },
        {
          img: img2,
          text: 'Bekommen Sie Follower & Likes mit begabten Münzen'
        }
      ]
    };
  },
  computed: {
    minorLangHide() {
      let hide;
      if (this.$i18n.locale === 'en') {
        hide = false;
      } else {
        hide = this.COMMON.isiOS();
      }
      return hide;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handle);

    this.pageIOS = this.$nuxt.$route.path === '/event-ios';
    this.buyNowBtnHide
      = (this.COMMON.getURLQuery('source') === 'google' && this.COMMON.isiOS())
      || this.$nuxt.$route.path === '/event-ios';
  },
  destroyed() {
    window.removeEventListener('scroll', this.handle);
  },
  methods: {
    handleScroll: function () {
      this.animateBegin = this.$refs.mark.getBoundingClientRect().top < window.innerHeight * 0.66;
    },
    handle() {
      const fun = this.handleScroll();
      this.COMMON.throttle(fun, 60, 100);
    },
    ga0() {
      this.$ga.event('inslogin', 'login', 'hplogin2');
    },
    ga00() {
      this.$scrollTo('#home-2-free', { offset: -1 * this.COMMON.headerHeight() });
      this.$ga.event('insdl', 'download', `hp1-${this.$i18n.locale}`);
    },
    ga01() {
      if (this.$i18n.locale === 'en') {
        this.$ga.event('insbuy', 'buy', 'hpbuy2');
        this.$nuxt.$router.push({
          path: '/buy-instagram-followers'
        });
      } else {
        let client = '';
        let clientLong = 'PC';
        if (this.COMMON.isAndroid()) {
          client = 'adr';
          clientLong = 'android';
        }

        this.$ga.event('insbuy', 'buy', `hp${client}1-${this.$i18n.locale}`);
        this.$nuxt.$router.push({
          path: '/buy-instagram-followers',
          query: {
            utm_source: clientLong,
            utm_medium: 'homepage'
          }
        });
      }
    },
    downloadMultiLang() {
      if (this.$i18n.locale === 'en') {
        this.downloadApp();
      } else {
        this.downloadAppMinorLang();
      }
    },
    downloadApp() {
      let param = '';
      if (this.COMMON.getURLQuery('camp') !== null) {
        param = this.COMMON.getURLQuery('camp');
      }

      if (this.COMMON.isiOS()) {
        if (this.$nuxt.$route.path === '/event-ios') {
          this.$ga.event('insdl', 'download', 'hpiosdlm2-ad');
          window.location.href = this.$constant.app.download.ios1;
        } else {
          this.$ga.event('insdl', 'download', 'hpiosdlm2');
          window.location.href = this.$constant.app.download.ios + `?pt=121014724&mt=8&ct=${param}`;
        }
      } else {
        this.$ga.event('insdl', 'download', 'hpappdlm2');
        if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
          window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;
        } else {
          window.location.href = this.$constant.app.download.android;
        }
      }
    },
    downloadAppMinorLang() {
      if (this.COMMON.isiOS()) {
        this.$ga.event('insdl', 'download', `hpios2-${this.$i18n.locale}`);
        // location.href =
        //   this.$constant.app.download.ios
        //   + `${this.$constant.app.campaign.iosMinorLang}&ct=${this.$i18n.locale}campaign`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
      } else {
        this.$ga.event('insdl', 'download', `hpadr2-${this.$i18n.locale}`);
        if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
          // location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

          // Beacon:MinorAppDownload
          location.href = this.$store.state.minorLangAdrLink;
        } else {
          location.href = this.$constant.app.download.android;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@include animateSteps(5);

.home-1-steps {
  background-color: #F8F9FC;
  text-align: center;

  .home-1-steps__steps-container {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home-1-steps__steps-container_unit {
      text-align: left;
      padding: 20px 0 20px 34px;
      display: inline-block;
      width: 450px;
      height: 170px;
      background: #FFFFFF;
      box-shadow: 0 5px 20px #00000008;
      border-radius: 12px;

      i {
        display: inline-block;
        width: 80px;
        height: 130px;
        vertical-align: top;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;

        &.step-1 {
          background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__step-1.svg");

          &.download {
            background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__step-1_mobile.svg");
          }
        }

        &.step-2 {
          background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__step-2.svg");
        }
      }

      .text {
        margin-left: 10px;
        padding-top: 30px;
        display: inline-block;
        width: 310px;

        &.minor-lang {
          padding-top: 18px;

          p {
            margin-top: 12px;
          }
        }

        h3 {
          font: 600 24px Montserrat;
          color: #000000;
        }

        p {
          margin-top: 24px;
          font: 500 20px Montserrat;
          color: #000000;
        }
      }
    }

    .home-1-steps__steps-container_arrow {
      display: inline-block;
      width: 85px;
      height: 85px;
      background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  .home-1-steps__btn-container {
    margin-top: 138px;
    display: inline-block;
    vertical-align: top;
    width: 490px;
    height: 100px;

    &.second {
      margin-left: 32px;
    }
  }
}

@media (min-width: 769px) {
  .home-1-steps {
    .home-1-steps__steps-container {
      &.mobile {
        display: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .home-1-steps {
    .home-1-steps__steps-container {
      margin-top: 50px;
      padding: 0 10.93vw;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;

      &.pc {
        display: none;
      }

      .home-1-steps__steps-container_unit {
        padding: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        width: 36%;
        height: auto;
        background: none;
        box-shadow: none;
        border-radius: 0;
        text-align: center;

        i {
          width: (170px/2);
          height: (170px/2);
          box-shadow: 0 3px 10px #00000008;
          border-radius: 50%;
          background-color: #FFFFFF;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;

          &.step-1 {
            background-size: 50%;
            background-image: url("~@/assets/images/home/home-1-steps/home-1-steps__step-1_mobile.svg");
          }

          &.step-2 {
            background-size: 48%;
          }
        }

        .text {
          margin: 0;
          padding-top: 15px;
          width: 100%;

          h3 {
            font-size: 12px;
          }

          p {
            margin-top: 4px;
            font-size: 11px;
          }
        }
      }

      .home-1-steps__steps-container_arrow {
        margin-top: (58px/2);
        width: (66px/2);
        height: (66px/2);
      }
    }

    .home-1-steps__btn-container {
      margin-top: 70px;
      width: (540px/2);
      height: (112px/2);

      &.second {
        margin-left: 0;
        margin-top: 16px;
      }
    }

    .home-1-steps-de__steps-container {
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;

      .home-1-steps-de__steps-container_wrapper {
        margin-top: 50px;
        padding-bottom: 10px;
        width: 245px*3;
        font-size: 0;
      }

      .unit {
        position: relative;
        display: inline-block;
        width: 245px;
        font-size: 0;
        vertical-align: top;

        img {
          width: (296px/2);
          height: (449px/2);
          object-fit: contain;
        }

        hr {
          margin-top: -2.5px;
          border-top: 2.5px solid #C2C6D4;
        }

        .index-container {
          position: relative;
          margin: -10px auto 0;
          width: 70px;
          background-color: #005FFF;
          border-radius: 25px;
          text-align: center;

          &:before {
            position: absolute;
            top: -8px;
            left: 0;
            right: 0;
            margin: auto;
            content: "";
            display: block;
            width: 0;
            height: 0;
            border: 4px solid transparent;
            border-bottom-color: #005FFF;
          }

          span {
            font: 600 12px/20px Montserrat;
            color: #FFFFFF;
          }
        }

        p {
          margin-top: 23px;
          font: 600 15px Montserrat;
          color: #2A2A2A;
        }
      }
    }
  }
}
</style>
