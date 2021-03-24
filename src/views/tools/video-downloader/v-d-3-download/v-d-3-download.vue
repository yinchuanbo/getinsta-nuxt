<template>
  <div class="v-d-3-download">
    <div class="wrapper">
      <h2>GetInsta - Get Free Instagram Followers & Likes</h2>
      <h3>
        With GetInsta Instagram Follower app, you can easily
        <nuxt-link to="/get-instagram-followers-likes">get free Instagram followers and likes</nuxt-link>
        from 100% real person, without spending a penny. No password. No survey. No risk.
      </h3>
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
  name: 'VD3Download',
  components: {
    ButtonDownloadAndroid,
    ButtonDownloadIos,
    ButtonYellowDownload
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
        label = 'appm';
        location.href = this.$store.state.enAdrLink;
      }
      if (this.$store.state.isiOS) {
        label = 'iosm';
        location.href
          = `${this.$store.state.enIosLink}`
          + `?pt=${this.$store.state.enIosLinkPt}`
          + `&ct=${this.$store.state.enIosLinkCt}`
          + `&mt=8`;
      }
      if (this.$store.state.isWindows) label = 'win2';
      this.$ga.event('insdl', 'download', `videopagedl-${label}`);
    },
    gaIOS() {
      this.$ga.event('insdl', 'download', 'videopagedl-ios2');
      location.href
        = `${this.$store.state.enIosLink}`
        + `?pt=${this.$store.state.enIosLinkPt}`
        + `&ct=${this.$store.state.enIosLinkCt}`
        + `&mt=8`;
    },
    gaAndroid() {
      this.$ga.event('insdl', 'download', 'videopagedl-app2');
      location.href = this.$store.state.enAdrLink;
    }
  }
};
</script>

<style lang="scss" scoped src="../...scss"></style>
