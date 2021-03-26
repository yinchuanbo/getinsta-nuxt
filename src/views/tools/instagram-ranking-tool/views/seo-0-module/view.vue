<template>
  <div class="seo-0-module">
    <div class="wrapper">
      <h2>{{ h2Text }}</h2>
      <h3>{{ h3Text }}</h3>
      <div class="download">
        <div class="btn-container" @click="gaBigBtn">
          <button-yellow-download class="pc" text="Download GetInsta" :icon="platform" :theme="'blue'" />
          <button-download-ios v-if="$store.state.isiOS" />
          <button-download-android v-if="$store.state.isAndroid" />
        </div>
        <div class="bottom pc">
          <a class="ios" title="Download from App Store" @click="gaIOS"></a>
          <i></i>
          <a class="android" title="Download for Android" @click="gaAndroid"></a>
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
  name: 'Seo0Module',
  components: { ButtonDownloadAndroid, ButtonDownloadIos, ButtonYellowDownload },
  props: {
    gaParam: {
      type: Object,
      default() {
        return {
          bigBtn: {
            windows: '',
            ios: '',
            android: ''
          },
          smallBtn: {
            ios: '',
            android: ''
          }
        };
      },
      required: true
    },
    h2Text: {
      type: String,
      default: 'H2Text',
      required: true
    },
    h3Text: {
      type: String,
      default: 'H3Text',
      required: true
    }
  },
  data() {
    return {};
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

<style scoped lang="scss" src="./view.scss"></style>
