<template>
  <div class="v-d-5-faq">
    <div class="wrapper">
      <div class="title">Frequently Asked Questions</div>
      <div class="list">
        <div v-for="(unit, i) in faqList" :key="i" class="unit" :class="{ 'on': i === faqListIndex }">
          <div class="list-title" title="Click toggle this question" @click="faqListClick(i)">{{ unit.q }}</div>
          <div class="list-content">{{ unit.a }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VD5Faq',
  components: {},
  data() {
    return {
      faqListIndex: -1,
      faqList: [
        {
          q: 'Q: Is this Instagram Video Downloader really free?',
          a: 'A: Yes. This online Instagram video downloader is totally free. You can use it without spending a penny and save content unlimitedly.'
        },
        {
          q: 'Q: Is it legal to save videos via Video Downloader for Instagram?',
          a: 'A: Yes. It is 100% safe and legal to use Video Downloader for content saving from Instagram. But, bear in mind a very crucial rule that it is legal to save someone\'s content to view offline, but you can\'t broadcast it for gaining profit.'
        },
        {
          q: 'Q: Can I save other than video content on this site?',
          a: 'A: No. It only supports downloading videos from Instagram.'
        },
        {
          q: 'Q: Are there any limits on the number of videos I can download?',
          a: 'A: No! If you wish, you can spend 24 hours a day with this IG video downloader to download videos from numerous Instagram users. We do not have a limit. Here at easygetinsta.com, it\'s all unlimited.'
        },
        {
          q: 'Q: What devices are compatible with this Instagram Video Downloader?',
          a: 'A: GetInsta Instagram Video Downloader allows saving media across computer, Android, and iOS.'
        },
        {
          q: 'Q: Does this service Download YouTube Videos?',
          a: 'A: Sorry, but YouTube isn\'t supported. If you want to download videos from YouTube, you can try out some YouTube Video Downloader.'
        },
        {
          q: 'Q: Can I download Instagram videos from any user?',
          a: 'A: Yes. You can download any video from all public users. For private accounts, you need to follow them on Instagram first, and then you can save videos from them.'
        }
      ]
    };
  },
  mounted() {
  },
  methods: {
    faqListClick(i) {
      if (i === this.faqListIndex) {
        this.faqListIndex = -1;
      } else {
        this.faqListIndex = i;
      }
    }
  }
};
</script>

<style lang="scss" scoped src="../../.."></style>
