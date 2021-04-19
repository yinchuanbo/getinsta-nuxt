<template>
  <div class="home-container">
    <div v-if="!$store.state.v2" class="home v1">
      <home0-banner />
      <home1-steps />
      <home2-daily-follower />
      <home2-free />
      <home3-steps />
      <home4-outstanding />
      <home5-advantages />
      <home6-reviews />
      <home7-download />
    </div>
    <div v-if="$store.state.v2" class="home v2">
      <home0-banner-v2 />
      <home1-steps-v2 />
      <home2-daily-follower-v2 />
      <home2-free-v2 />
      <home4-outstanding-v2 />
      <home5-advantages-v2 />
      <home6-reviews-v2 />
      <home7-download-v2 />
      <home8-reasons-v2 />
      <home9-download-btn />
      <home10-qualities-have/>
      <home11-traps-v2 />
      <home12-download-btn />
      <home-13-matter-v2 />
    </div>
  </div>
</template>

<script>
import Home0Banner from '@/views/home/home-v1/home-0-banner/home-0-banner';
import Home1Steps from '@/views/home/home-v1/home-1-steps/home-1-steps';
import Home2Free from '@/views/home/home-v1/home-2-free/home-2-free';
import Home3Steps from '@/views/home/home-v1/home-3-steps/home-3-steps';
import Home4Outstanding from '@/views/home/home-v1/home-4-outstanding/home-4-outstanding';
import Home5Advantages from '@/views/home/home-v1/home-5-advantages/home-5-advantages';
import Home6Reviews from '@/views/home/home-v1/home-6-reviews/home-6-reviews';
import Home7Download from '@/views/home/home-v1/home-7-download/home-7-download';
// import Home5DeAdvantages from '@/views/home/home-5-de-advantages';
// import Home8How from '@/views/home/home-8-how';
// import StoreShelf1Buy from '@/views/store-pages/store-shelf-1-buy-followers/view';
// import StoreShelf0Banner from '@/views/store-pages/store-shelf-0-banner-followers/view';
// import Home5DeAdvantagesGetinshot from '@/views/home/home-5-de-advantages-getinshot';
// import Home1StepsDe from '@/views/home/home-1-steps-de';
// import Home0BannerDeIos from '@/views/home/home-0-banner-de-ios';
// import Home1StepsDeIos from '@/views/home/home-1-steps-de-ios';
// import Home2FreeDeIos from '@/views/home/home-2-free-de-ios';
// import Home3StepsDeIos from '@/views/home/home-3-steps-de-ios';
// import Home4OutstandingDeIos from '@/views/home/home-4-outstanding-de-ios';
// import Home9VideoDeIos from '@/views/home/home-9-video-de-ios';
import Home2DailyFollower from '@/views/home/home-v1/home-2-daily-follower/home-2-daily-follower';
import Home0BannerV2 from '@/views/home/home-v2/home-0-banner/home-0-banner';
import Home1StepsV2 from '@/views/home/home-v2/home-1-steps/home-1-steps';
import Home2DailyFollowerV2 from '@/views/home/home-v2/home-2-daily-follower/home-2-daily-follower';
import Home2FreeV2 from '@/views/home/home-v2/home-2-free/home-2-free';
import Home4OutstandingV2 from '@/views/home/home-v2/home-4-outstanding/home-4-outstanding';
import Home5AdvantagesV2 from '@/views/home/home-v2/home-5-advantages/home-5-advantages';
import Home6ReviewsV2 from '@/views/home/home-v2/home-6-reviews/home-6-reviews';
import Home7DownloadV2 from '@/views/home/home-v2/home-7-download/home-7-download';
import home8ReasonsV2 from '@/views/home/home-v2/home-8-reasons/home-8-reasons';
import home9DownloadBtn from '@/views/home/home-v2/home-9-download-btn/home-9-download-btn';
import home10QualitiesHave from '@/views/home/home-v2/home-10-qualities-have/home-10-qualities-have';
import home11TrapsV2 from '@/views/home/home-v2/home-11-traps/home-11-traps';
import home12DownloadBtn from '@/views/home/home-v2/home-12-download-btn/home-12-download-btn';
import home13MatterV2 from '@/views/home/home-v2/home-13-matter/home-13-matter';





export default {
  name: 'Home',
  components: {
    Home7DownloadV2,
    Home6ReviewsV2,
    Home5AdvantagesV2,
    Home4OutstandingV2,
    Home2FreeV2,
    Home2DailyFollowerV2,
    Home1StepsV2,
    Home0BannerV2,
    home8ReasonsV2,
    home9DownloadBtn,
    home10QualitiesHave,
    home11TrapsV2,
    home12DownloadBtn,
    home13MatterV2,
    // Home9VideoDeIos,
    // Home4OutstandingDeIos,
    // Home3StepsDeIos,
    // Home2FreeDeIos,
    // Home1StepsDeIos,
    // Home0BannerDeIos,
    // Home1StepsDe,
    // Home5DeAdvantagesGetinshot,
    // StoreShelf0Banner,
    // StoreShelf1Buy,
    // Home8How,
    // Home5DeAdvantages,
    Home7Download,
    Home6Reviews,
    Home5Advantages,
    Home4Outstanding,
    Home3Steps,
    Home2Free,
    Home2DailyFollower,
    Home1Steps,
    Home0Banner
  },
  data() {
    return {
      meta: {
        title: this.$t('home.meta.title')
      }
    };
  },
  mounted() {
    this.setURLQuery();

    // if (this.$nuxt.$route.path === `/event-ios`) {
    //   this.meta.title = 'Get Real Instagram Followers & Likes';
    // }

    // BTN按钮测试统计☆（测试已结束）
    // if (this.$store.state.btnTestGate)
    //   this.$ga.event(
    //     'insimp',
    //     'impression',
    //     `hp${this.$store.state.platform}${this.$store.state.gaColor}`
    //   );
  },
  methods: {
    setURLQuery() {
      let key = this.COMMON.getURLQuery('to');
      if (key === undefined || key === null) {
        key = '';
      }
      this.$storage.set('to', key);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  overflow-x: hidden;

  .home-blank {
    height: 170px;
  }
}

@media (max-width: 768px) {
  .home {
    .home-blank {
      height: 85px;
    }
  }
}
</style>
