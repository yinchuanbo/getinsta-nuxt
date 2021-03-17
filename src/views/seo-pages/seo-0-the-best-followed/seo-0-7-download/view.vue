<template>
  <div class="seo-0-7-download">
    <div class="wrapper">
      <div class="img">
        <img src="../@/assets/images/seo-pages/seo-0-the-best-followed/seo-0-7-download/img_feature_real.svg" alt="">
      </div>
      <div class="text">
        <h2>GetInsta – Promote Your Instagram Account Instantly</h2>
        <ul>
          <li><span>Get Instagram followers & likes for free</span></li>
          <li><span>100% organic followers from real people</span></li>
          <li><span>Reliable, safe and professional</span></li>
        </ul>
        <div class="btn">
          <div class="btn-big" @click="gaBigBtn">
            <button-yellow-download class="pc" text="Download GetInsta" :icon="platform" :theme="'blue'" />
            <button-download-ios v-if="$store.state.isiOS" />
            <button-download-android v-if="$store.state.isAndroid" />
          </div>
          <div class="btn-small pc">
            <a class="ios" title="Download from App Store" @click="gaIOS"></a>
            <i></i>
            <a class="android" title="Download for Android" @click="gaAndroid"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonYellowDownload from '@/components/button/button-yellow-download';
import ButtonDownloadIos from '@/components/button/button-download-ios';
import ButtonDownloadAndroid from '@/components/button/button-download-android';

export default {
  name: 'Seo07Download',
  components: { ButtonDownloadAndroid, ButtonDownloadIos, ButtonYellowDownload },
  data() {
    return {
      gaParam: {
        bigBtn: {
          windows: 'win4',
          ios: 'ios4',
          android: 'app4'
        },
        smallBtn: {
          ios: 'ios4',
          android: 'app4'
        }
      }
    };
  },
  computed: {
    platform() {
      let name = '';
      if (this.$store.state.isAndroid) {
        name = 'android';
      } else if (this.$store.state.isiOS) {
        name = 'ios';
      } else {
        name = 'windows';
      }
      return name;
    }
  },
  mounted() {
  },
  methods: {
    gaBigBtn() {
      let label = '';
      if (this.$store.state.isAndroid) {
        label = this.gaParam.bigBtn.android;
        location.href = this.$store.state.enAdrLink;
      }
      if (this.$store.state.isiOS) {
        label = this.gaParam.bigBtn.ios;
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      }
      if (this.$store.state.isWindows) label = this.gaParam.bigBtn.windows;

      this.$ga.event('insdl', 'download', `rankingtooldl-${label}`);
    },
    gaIOS() {
      this.$ga.event('insdl', 'download', `rankingtooldl-${this.gaParam.smallBtn.ios}`);
      location.href
        = `${this.$store.state.enIosLink}`
        + `?pt=${this.$store.state.enIosLinkPt}`
        + `&ct=${this.$store.state.enIosLinkCt}`
        + `&mt=8`;
    },
    gaAndroid() {
      this.$ga.event('insdl', 'download', `rankingtooldl-${this.gaParam.smallBtn.android}`);
      location.href = this.$store.state.enAdrLink;
    }
  }
};
</script>

<style scoped lang="scss" src="view.scss"></style>
