<template>
  <div class="seo-6-event-download" style="overflow: hidden">
    <home0-banner :page-name="'event-dl'" />
    <home1-steps :page-name="'event-dl'" />
    <home4-outstanding :page-name="'event-dl'" />
    <home5-advantages />
    <home6-reviews />
    <home7-download :page-name="'event-dl'" />
  </div>
</template>

<script>
import Home0Banner from '@/views/home/home-v1/home-0-banner/home-0-banner';
import Home1Steps from '@/views/home/home-v1/home-1-steps/home-1-steps';
import Home4Outstanding from '@/views/home/home-v1/home-4-outstanding/home-4-outstanding';
import Home5Advantages from '@/views/home/home-v1/home-5-advantages/home-5-advantages';
import Home6Reviews from '@/views/home/home-v1/home-6-reviews/home-6-reviews';
import Home7Download from '@/views/home/home-v1/home-7-download/home-7-download';

export default {
  name: 'Seo6EventDownload',
  components: {
    Home7Download,
    Home6Reviews,
    Home5Advantages,
    Home4Outstanding,
    Home1Steps,
    Home0Banner
  }
};
</script>
