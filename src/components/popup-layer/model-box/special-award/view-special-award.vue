<template>
  <div class="uni-dialog-box" :class="{ 'enter-box': enterBox, 'enter-mask': enterMask }">
    <div class="mask"></div>
    <div class="container special-award">
      <i class="close" @click="cancel()"></i>
      <div class="content">
        <div v-if="type === 'win'" class="content-title">
          <h1>Congrats!</h1>
          <h2>You win <b>{{ number }}</b> coins.</h2>
        </div>
        <div v-if="type !== 'win'" class="content-title">
          <h1>Sorry!</h1>
          <h2>Thanks for Participation</h2>
        </div>
        <div class="content-detail">
          <p class="best">Best Offer Ever</p>
          <div class="countdown">
            <countdown
              :end-time="new Date().getTime() + 61000" :speed="1000"
              :auto-start="true" @finish="vacFinished = true"
            >
              <template #process="{ timeObj }">{{ timeObj.m }} m : {{ timeObj.s }} s</template>
              <template #finish>Time Up!</template>
            </countdown>
          </div>
          <p class="follow-num">200</p>
          <p class="follow-text">Followers</p>
          <p class="price"><span>Only</span><b> $ 2.</b><i>99</i></p>
          <div class="btn" @click="ok()">
            <button-orange
              :text="btnText" :font-family="'Futura'" :font-size="'size-20-u'"
              :theme-light="!vacFinished" :theme-disabled="vacFinished"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonOrange from '~/components/button/button-orange';

export default {
  name: 'ModelBoxSpecialAward',
  components: {
    ButtonOrange
  },
  props: {
    type: {
      type: String,
      default: 'win'
    },
    number: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      enterBox: false,
      enterMask: false,
      vacFinished: false
    };
  },
  computed: {
    btnText() {
      return this.vacFinished ? 'Time Up' : 'Get It Now';
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
      if (!this.vacFinished) {
        this.boxFadeOut('ok');
      }
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

<style scoped lang="scss" src="../../../../assets/styles/fonts-additional.scss"></style>
