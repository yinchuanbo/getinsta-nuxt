<template>
  <div class="faq-0-list" :class="{ 'on': animateOn }">
    <div class="header-blank"></div>
    <div class="faq-0-list__title">
      <h1>{{ $t('faq.title') }}</h1>
    </div>
    <div class="wrapper">
      <div class="faq-0-list__list" @click="accordionDOM">
        <div v-for="(unit, i) in textList" :key="i" class="unit">
          <h2>{{ unit.title }}</h2>
          <div class="p" v-html="unit.text"></div>
        </div>

        <!--download-->
        <div class="unit">
          <h2>{{ $t('faq.faqList.download.title') }}</h2>
          <div class="p">
            {{ $t('faq.faqList.download.text') }}
            <br><br>
            <label v-if="$i18n.locale === 'en'" class="pc" @click="downloadWindows">
              <!--<button-download-windows-yellow />-->
              <button-download-windows />
            </label>
            <span v-if="$i18n.locale === 'en'" class="blank pc"></span>
            <label class="pc" @click="downloadAndroid">
              <button-download-android />
            </label>
            <span class="blank pc"></span>
            <label class="pc" @click="downloadIOS">
              <button-download-ios />
            </label>

            <label v-if="!$store.state.isiOS" class="mobile" @click="downloadAndroid">
              <button-download-android />
            </label>
            <div class="blank"></div>
            <label v-if="$store.state.isiOS" class="mobile" @click="downloadIOS">
              <button-download-ios />
            </label>
          </div>
        </div>

        <!--buy-->
        <div class="unit">
          <h2>{{ $t('faq.faqList.buy.title') }}</h2>
          <div class="p">
            {{ $t('faq.faqList.buy.text') }}
            <br><br>
            <label @click="gaBuy">
              <div class="btn-container">
                <button-yellow-icon :text="$t('global.header.button.buyNow')" :font-size="'size-20'" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ButtonDownloadWindowsYellow from '@/components/button/button-download-windows-yellow';
import ButtonDownloadAndroid from '@/components/button/button-download-android';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonYellowIcon from '@/components/button/button-yellow-icon';
import ButtonDownloadWindows from '@/components/button/button-download-windows';

export default {
  name: 'Faq0List',
  components: {
    ButtonDownloadWindows,
    ButtonYellowIcon,
    ButtonDownloadIos,
    ButtonDownloadAndroid,
    // ButtonDownloadWindowsYellow
  },
  data() {
    return {
      animateOn: false
    };
  },
  computed: {
    textList() {
      return this.$t('faq.faqList.textList');
    }
  },
  mounted() {
    setTimeout(() => {
      this.animateOn = true;
    }, 100);
  },
  methods: {
    downloadWindows() {
      this.$ga.event('insdl', 'download', 'faqwindl');
      window.location.href = this.$constant.app.download.windows;
    },
    downloadAndroid() {
      const lang = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';
      const client = this.$i18n.locale === 'en' ? `app` : 'adr';
      this.$ga.event('insdl', 'download', `faq${client}dl${lang}`);
      if (this.$i18n.locale === 'fr' || this.$i18n.locale === 'de') {
        // window.location.href = `${this.$constant.app.download.android}?lang=${this.$i18n.locale}`;

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangAdrLink;
      } else {
        window.location.href = this.$store.state.enAdrLink;
      }
    },
    downloadIOS() {
      const lang = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';
      // const iosParam = this.$i18n.locale !== 'en' ? this.$constant.app.campaign.iosMinorLang : '';

      if (this.$i18n.locale === 'en') {
        this.$ga.event('insdl', 'download', `faqiosdl`);
        window.location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      } else {
        const iosParam0 = this.COMMON.isiOS() ? '' : 'dl';
        this.$ga.event('insdl', 'download', `faqios${iosParam0}${lang}`);

        // Beacon:MinorAppDownload
        location.href = this.$store.state.minorLangIosLink;
      }
    },
    gaBuy() {
      const lang = this.$i18n.locale !== 'en' ? `-${this.$i18n.locale}` : '';
      let client = '';
      if (this.$i18n.locale !== 'en') {
        if (this.COMMON.isiOS()) client = 'ios';
        if (this.COMMON.isAndroid()) client = 'adr';
      }

      this.$ga.event('insbuy', 'buy', `faq${client}buy${lang}`);

      let query = {};
      let client_p = '';
      if (this.$i18n.locale !== 'en') {
        if (!this.COMMON.isMobile()) client_p = 'PC';
        if (this.COMMON.isiOS()) client_p = 'IOS';
        if (this.COMMON.isAndroid()) client_p = 'android';
        query = {
          utm_source: client_p,
          utm_medium: 'faq'
        };
      }

      this.$router.push({ path: '/buy-instagram-followers', query: query });
    },
    accordionDOM(ev) {
      let thisDOM = this.COMMON.closest(ev.target, '.unit');
      if (thisDOM.classList.contains('active')) {
        thisDOM.classList.remove('active');
        return;
      }

      let units = document.getElementsByClassName('unit');
      Array.prototype.forEach.call(units, function (element) {
        element.classList.remove('active');
      });

      // setTimeout(() => {
      thisDOM.classList.add('active');
      // }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.faq-0-list {
  .faq-0-list__title {
    width: 100%;
    height: 500px;
    /*background: url("~@/assets/images/faq/faq-0-list/faq-0-list__bg.svg") no-repeat top center;*/
    /*background-size: 100% 100%;*/
    background: linear-gradient(256deg, #111EC5, #AD34D8, #FF9161);
    border-radius: 50%/ 0 0 20% 20%;

    h1 {
      padding-top: 142px;
      font: 700 40px/66px Montserrat;
      color: #FFFFFF;
      text-align: center;
    }
  }

  .wrapper {
    width: 1200px;
  }

  .faq-0-list__list {
    margin-top: -164px;
    padding: 18px 78px 64px;
    background: #FFFFFF;
    box-shadow: 0 10px 20px #00136112;
    border-radius: 12px;

    .unit {
      padding: 38px 0 30px;
      border-bottom: 1px solid #E8E8E8;

      &.active {
        h2 {
          &:before {
            background-image: url("~@/assets/images/global/icon_minus.svg");
          }
        }

        div.p {
          margin-top: 32px;
          max-height: 310px;
        }
      }

      h2, div.p {
        padding-left: 20+24px;

        &:before {
          position: absolute;
          top: 0;
          left: 0;
          content: "";
          display: inline-block;
          width: 24px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
      }

      h2 {
        position: relative;
        font: 600 20px/24px Montserrat;
        color: #2a2a2a;
        cursor: pointer;

        &:before {
          width: 16px;
          height: 24px;
          background-image: url("~@/assets/images/global/icon_plus.svg");
        }
      }

      div.p {
        position: relative;
        margin-top: 0;
        font: 400 16px/20px Montserrat;
        color: #2A2A2A;
        max-height: 0;
        overflow: hidden;
        transition: all 0.6s;

        &:before {
          //height: 24px;
          //background-image: url("~@/assets/images/faq/faq-0-list/faq-0-list__icon_answer.svg");
        }

        b {
          font-weight: 600;
        }

        ul {
          li {
            margin-top: 16px;
            list-style: inside disc;
            font-weight: 600;
          }
        }

        a {
          color: #005fff;
          text-decoration: underline;
        }
      }

      span.blank {
        display: inline-block;
        width: 32px;
      }

      .btn-container {
        display: inline-block;
        width: 240px;
        height: 80px;
      }
    }
  }
}

@media (max-width: 768px) {
  .faq-0-list {

    .faq-0-list__title {
      height: 250px;

      h1 {
        padding-top: 71px;
        font: 700 27px Montserrat;
      }
    }

    .wrapper {
      padding: 0 4vw;
      width: 100% !important;
    }

    .faq-0-list__list {
      margin-top: -(164px/2);
      padding: 30px 0;
      box-shadow: 0 8px 20px #00136112;

      .unit {
        padding: (38px/2) 4vw (30px/2);

        &:first-child {
          padding-top: 0;
        }

        &.active {
          div.p {
            margin-top: 25px;
            max-height: 690px;
          }
        }

        h2, div.p {
          padding-left: 10vw;

          &:before {
            width: 25px;
          }
        }

        h2 {
          font: 600 16px/20px Montserrat;

          &:before {
            top: 1px;
            width: 12px;
            height: 16px;
          }
        }

        div.p {
          margin-top: 0;
          font: 400 14px/18px Montserrat;

          &:before {
            top: 4px;
          }

          b {
            font-weight: 600;
          }
        }

        .btn-container {
          width: 211px;
          height: 56px;
        }
      }
    }
  }
}
</style>
