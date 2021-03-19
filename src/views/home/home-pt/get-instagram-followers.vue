<template>
  <div class="home">
    <home-pt0-banner />
    <home-pt1-outstanding />
    <home-pt2-download />
    <home-pt3-advantages />
    <home-pt4-reviews />
    <home-pt2-download bg-color="white" />
  </div>
</template>

<script>
import HomePt0Banner from '@/views/home/home-pt/views/home-pt-0-banner';
import HomePt1Outstanding from '@/views/home/home-pt/views/home-pt-1-outstanding';
import HomePt2Download from '@/views/home/home-pt/views/home-pt-2-download';
import HomePt3Advantages from '@/views/home/home-pt/views/home-pt-3-advantages';
import HomePt4Reviews from '@/views/home/home-pt/views/home-pt-4-reviews';

export default {
  name: 'HomePT',
  components: {
    HomePt4Reviews,
    HomePt3Advantages,
    HomePt2Download,
    HomePt1Outstanding,
    HomePt0Banner
  }
};
</script>


