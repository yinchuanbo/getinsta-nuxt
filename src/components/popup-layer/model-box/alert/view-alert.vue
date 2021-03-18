<template>
  <div class="uni-dialog-box" :class="{ 'enter-box': enterBox, 'enter-mask': enterMask }">
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
               'christmas': icon === 'christmas'
             }"
        >
          <div class="title">
            <i class="icon"></i>
            <h3>{{ title }}</h3>
          </div>
          <p class="note" v-html="body"></p>
          <div class="btn" :class="{'lottery':button === `lottery`}" @click="ok()">
            <button-yellow
              v-if="button === `download`"
              :text="btnTextDisplay"
              :font-size="`size-16`"
              :square="true"
              :shadow="true"
            />
            <button-yellow-download-coin
              v-if="button === `download-icon`"
              :text="btnTextDisplay"
            />
            <button-purple
              v-if="button === `normal` || button === ``"
              :text="btnTextDisplay"
              :font-size="`size-16`"
              :square="true"
            />
            <button-red-gradient
              v-if="button === `christmas`"
              :text="btnTextDisplay" :font-size="`size-20`"
            />
            <seo1LotteryBtn
              v-if="button === `lottery`"
              :btn-style="btnStyle"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonPurple from '~/components/button/button-purple';
import ButtonYellow from '~/components/button/button-yellow';
import ButtonYellowDownloadCoin from '~/components/button/button-yellow-download-coin';
import ButtonRedGradient from '~/components/button/button-red-gradient';
import seo1LotteryBtn from '~/components/button/seo-1-lottery-btn';

export default {
  name: 'ModelBoxAlert',
  components: {
    ButtonRedGradient,
    ButtonYellowDownloadCoin,
    ButtonYellow,
    seo1LotteryBtn,
    ButtonPurple
  },
  props: {
    bg: {
      type: String,
      default: 'idle'
    },
    btnStyle: {
      type: Object,
      default: null,
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
    }
  },
  data() {
    return {
      enterBox: false,
      enterMask: false
    };
  },
  computed: {
    btnTextDisplay() {
      return this.btnText === '' ? 'Close' : this.btnText;
    }
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
