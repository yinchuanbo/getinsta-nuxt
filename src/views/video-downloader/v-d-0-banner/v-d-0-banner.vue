<template>
  <div class="v-d-0-banner">
    <div class="header-blank"></div>
    <div class="wrapper">
      <h1>Free Instagram Video Downloader Online</h1>
      <h2>Free download Instagram videos to anywhere with the best free Instagram Video Downloader.</h2>
      <div class="steps">
        <div class="img"></div>
        <div class="texts">
          <p>Copy URL</p>
          <p>Paste URL</p>
          <p>Preview Video</p>
          <p>Confirm Download</p>
        </div>
      </div>
      <div class="downloader">
        <div class="field">
          <label>
            <input id="video-downloader-input" v-model="videoURL"
                   type="text" placeholder="Paste Instagram video URL here..."
                   @input="inputHandle"
            >
          </label>
          <label class="video-downloader-label"
                 :class="{ 'loading': ajaxRequesting }"
                 @click="requestVideoList"
          >
            <span>Download Video</span>
          </label>
        </div>

        <transition name="fade-tabs" mode="out-in">
          <router-link v-if="!onResult"
                       to="/"
                       class="note"
          >
            Want 5000+ free Instagram followers?
          </router-link>
          <div v-if="onResult" class="result">
            <div class="result-container">
              <div class="title">
                <span class="column-0">Quality</span>
                <span class="column-1">File Type</span>
                <span class="column-2">Downloads</span>
              </div>
              <div class="list">
                <div v-for="(unit, i) in resultList" :key="i" class="row">
                  <span class="column-0">{{ unit.quality }}</span>
                  <span class="column-1">{{ unit.type }}</span>
                  <span class="column-2"><a target="_blank" :href="unit['video_url']" @click="ga1">Download</a></span>
                </div>
              </div>
            </div>
            <div class="download-btn-container">
              <p>Want 5000+ free Instagram followers & likes from real person?</p>
              <div class="btn" @click="ga2">
                <button-purple text="Free Get Now" :font-size="'size-16'" />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <transition name="fade">
      <div v-if="dialogFail" key="diag1" class="uni-dialog-box enter-box enter-mask">
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
import api from '~/src/api/api.other.js';
import ButtonPurple from '@/components/button/button-purple';
import apiAccount from '~/src/api/api.account';

export default {
  name: 'VD0Banner',
  components: { ButtonPurple },
  data() {
    return {
      ajaxRequesting: false,
      onResult: false,
      resultList: [],
      videoURL: '',

      dialogFail: false,
      dialogFailMsg: ''
    };
  },
  mounted() {
  },
  methods: {
    closeDialog() {
      this.dialogFail = false;
    },
    inputHandle() {
      this.onResult = false;
    },
    requestVideoList() {
      this.ga0();

      if (this.videoURL === '') return;

      if (!this.ajaxRequesting) {
        this.ajaxRequesting = true;
        this.$axios.post(
          api.videoDownload,
          this.COMMON.paramSign({
            search_url: this.videoURL
          })
        ).then((response) => {
          this.ajaxRequesting = false;
          if (response.data.status === 'ok') {
            this.resultList = response.data['videos'];
            this.onResult = true;

          } else if (response.data.error !== undefined) {

            console.log(response.data);

            if (response.data.error.type === 'bad_url') {
              this.dialogFailMsg = 'Please input valid URL';
              this.dialogFail = true;

            } else {
              this.dialogFailMsg = '<samp>'
                + '<b>Error Type:</b> ' + response.data.error.type
                + '<br>' + '<b>Error Message:</b> ' + response.data.error.message
                + '</samp>';
              this.dialogFail = true;
            }
          } else {
            this.dialogFailMsg = 'Unknown error';
            this.dialogFail = true;
          }
        }).catch((error) => {
          this.ajaxRequesting = false;
          this.dialogFailMsg = '<samp>'
            + '<b>Error Status:</b> ' + error.status
            + '<br>' + '<b>Error Message:</b> ' + error.statusText
            + '</samp>';
          this.dialogFail = true;
          console.log('Catch Error: requestVideoList', error);
        });
      }
    },
    ga0() {
      this.$ga.event('insvideo', 'videodl', 'videodl-1');
    },
    ga1() {
      this.$ga.event('insvideo', 'videodl', 'videodl-2');
    },
    ga2() {
      let label = '', downloader = '';
      if (this.$store.state.isWindows) {
        label = 'win1';
        downloader = this.$constant.app.download.windows;
      }
      if (this.$store.state.isiOS) {
        label = 'ios1';
        downloader = this.$constant.app.download.ios;
      }
      if (this.$store.state.isAndroid) {
        label = 'app1';
        downloader = this.$constant.app.download.android;
      }
      this.$ga.event('insdl', 'download', `videopagedl-${label}`);
      window.location.href = downloader;
    }
  }
};
</script>

<style lang="scss" scoped src="../..css"></style>
