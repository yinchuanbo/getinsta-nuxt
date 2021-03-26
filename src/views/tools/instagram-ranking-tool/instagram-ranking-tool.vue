<template>
  <div class="seo-0-the-best-followed">
    <seo00-banner />
    <seo01-navigation />
    <seo02-list />
    <seo03-how-it-works />
    <seo04-top20 />
    <seo06-the-best-way />
    <seo07-download />
    <seo05-how-to-become />
    <seo08-tips />
  </div>
</template>

<script>
import Seo00Banner from '@/views/tools/instagram-ranking-tool/views/seo-0-0-banner/view';
import Seo01Navigation from '@/views/tools/instagram-ranking-tool/views/seo-0-1-navigation/view';
import Seo02List from '@/views/tools/instagram-ranking-tool/views/seo-0-2-list/view';
import Seo03HowItWorks from '@/views/tools/instagram-ranking-tool/views/seo-0-3-how-it-works/view';
import Seo04Top20 from '@/views/tools/instagram-ranking-tool/views/seo-0-4-top-20/view';
import Seo05HowToBecome from '@/views/tools/instagram-ranking-tool/views/seo-0-5-how-to-become/view';
import Seo06TheBestWay from '@/views/tools/instagram-ranking-tool/views/seo-0-6-the-best-way/view';
import Seo07Download from '@/views/tools/instagram-ranking-tool/views/seo-0-7-download/view';
import Seo08Tips from '@/views/tools/instagram-ranking-tool/views/seo-0-8-tips/view';

export default {
  name: 'Seo0TheBestFollowed',
  components: {
    Seo08Tips,
    Seo07Download,
    Seo06TheBestWay,
    Seo05HowToBecome,
    Seo04Top20,
    Seo03HowItWorks,
    Seo02List,
    Seo01Navigation,
    Seo00Banner
  }
};
</script>

<style scoped lang="scss" src="./instagram-ranking-tool.scss"></style>
