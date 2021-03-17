<template>
  <div class="uni-action-sheet" :class="{ 'enter-box': enterBox, 'enter-mask': enterMask }">
    <div class="mask"></div>
    <div class="container" :class="{ 'bg-festival': bg === 'festival' }">
      <i class="close" @click="cancel()"></i>
      <div class="content">
        <div class="model-box"
             :class="{
               'idle': icon === 'idle' || icon === '',
               'success': icon === 'success',
               'info': icon === 'info',
               'attention': icon === 'warn',
               'alert': icon === 'error',
               'alert-coin': icon === 'error-weak',
               'clap': icon === 'clap',
               'logo getinsup': icon === 'logo-getinsup',
               'logo getinshot': icon === 'logo-getinshot',
               'logo followers-gallery': icon === 'logo-followers-gallery'
             }"
        >
          <div class="title">
            <i class="icon"></i>
            <h3>{{ title }}</h3>
          </div>
          <p class="note" v-html="body"></p>
          <div class="btn" @click="ok()">
            <button-yellow
              v-if="button === `download`"
              :text="btnText"
              :font-size="`size-16`"
              :square="true"
              :shadow="true"
            />
            <button-yellow-download-coin v-if="button === `download-icon`" :text="btnText" />
            <button-purple
              v-if="button === `normal` || button === ``"
              :text="btnText"
              :font-size="`size-16`"
              :square="true"
            />
            <!--<button-yellow-download-->
            <!--  v-if="button === 'download-getinsup'" :text="btnText"-->
            <!--  :icon="'ios'" :font-size="'size-16'" :square="true" :exclusive="'getinsup'"-->
            <!--  :app-analytics="appAnalytics"-->
            <!--/>-->
            <button-yellow
              v-if="button === 'download-getinsup-app-store'" :text="btnText"
              :icon="'ios'" :font-size="'size-16'" :square="true"
            />
            <button-yellow
              v-if="button === 'download-getinsup-google-play'" :text="btnText"
              :icon="'android-google-play'" :font-size="'size-16'" :square="true"
            />
            <!--            <button-download-android v-if="button === 'download-getinsup-google-play'" />-->
            <!--            <button-download-ios v-if="button === 'download-getinsup-app-store'" />-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '@/components/button/button-purple';
import ButtonYellow from '@/components/button/button-yellow';
import ButtonYellowDownloadCoin from '@/components/button/button-yellow-download-coin';
// import ButtonDownloadAndroid from '@/components/button/button-download-android';
// import ButtonDownloadIos from '@/components/button/button-download-ios';
// import ButtonYellowDownload from '@/components/button/button-yellow-download';

export default {
  name: 'ModelBoxActionSheet',
  components: {
    // ButtonDownloadIos,
    // ButtonDownloadAndroid,
    // ButtonYellowDownload,
    ButtonYellowDownloadCoin,
    ButtonYellow,
    ButtonPurple
  },
  props: {
    mask: {
      type: Boolean,
      default: false
    },
    bg: {
      type: String,
      default: 'idle'
    },
    icon: {
      type: String,
      default: 'idle'
    },
    title: {
      type: String,
      default: 'Title'
    },
    body: {
      type: String,
      default: 'Body'
    },
    button: {
      type: String,
      default: 'idle'
    },
    btnText: {
      type: String,
      default: 'Close'
    },
    appAnalytics: {
      type: Object,
      default() {
        return {
          pt: '',
          ct: '',
          mt: ''
        };
      }
    }
  },
  data() {
    return {
      enterBox: false,
      enterMask: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.enterBox = true;
      }, 10);
      setTimeout(() => {
        this.enterMask = true;
      }, 310);
    });
  },
  methods: {
    ok() {
      this.boxFadeOut('ok');
    },
    cancel() {
      this.boxFadeOut('cancel');
    },
    boxFadeOut(promise) {
      this.enterBox = false;
      setTimeout(() => {
        this.enterMask = false;
      }, 300);
      setTimeout(() => {
        this.$emit(promise);
      }, 600);
    }
  }
};
</script>
