<template>
  <div class="video-downloader">
    <v-d0-banner />
    <v-d1-des />
    <v-d2-des />
    <v-d3-download />
    <v-d4-des />
    <v-d5-faq />
    <v-d6-tips />
  </div>
</template>

<script>
import VD0Banner from '@/views/tools/video-downloader/views/v-d-0-banner/v-d-0-banner';
import VD1Des from '@/views/tools/video-downloader/views/v-d-1-des/v-d-1-des';
import VD2Des from '@/views/tools/video-downloader/views/v-d-2-des/v-d-2-des';
import VD3Download from '@/views/tools/video-downloader/views/v-d-3-download/v-d-3-download';
import VD4Des from '@/views/tools/video-downloader/views/v-d-4-des/v-d-4-des';
import VD5Faq from '@/views/tools/video-downloader/views/v-d-5-faq/v-d-5-faq';
import VD6Tips from '@/views/tools/video-downloader/views/v-d-6-tips/v-d-6-tips';

export default {
  name: 'VideoDownloader',
  components: {
    VD6Tips,
    VD5Faq,
    VD4Des,
    VD3Download,
    VD2Des,
    VD1Des,
    VD0Banner
  },
  metaInfo() {
    return {
      title: 'Instagram Video Downloader: Save Videos to Anywhere for Free',
      meta: [
        {
          name: 'description',
          content: 'GetInsta Free Instagram Video Downloader helps download online Instagram videos to anywhere you want, your computer, and your iOS or Android devices.'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${window.location.origin}${this.$route.path}`
        }
      ]
    };
  },
  data() {
    return {};
  },
  mounted() {

  },
  methods: {}
};
</script>

<style lang="scss" src="./video-downloader.scss"></style>
