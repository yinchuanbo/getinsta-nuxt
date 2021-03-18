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
import HomePt0Banner from '@/views/home-pt/home-pt-0-banner';
import HomePt1Outstanding from '@/views/home-pt/home-pt-1-outstanding';
import HomePt2Download from '@/views/home-pt/home-pt-2-download';
import HomePt3Advantages from '@/views/home-pt/home-pt-3-advantages';
import HomePt4Reviews from '@/views/home-pt/home-pt-4-reviews';

export default {
  name: 'HomePT',
  components: {
    HomePt4Reviews,
    HomePt3Advantages,
    HomePt2Download,
    HomePt1Outstanding,
    HomePt0Banner
  },
  data() {
    return {};
  },
  metaInfo() {
    return {
      title: 'GetInsta - Ganhe Seguidores Reais no Instagram',
      meta: [
        {
          name: 'description',
          content: 'Ganhe seguidores reais e curtidas GRÁTIS no Instagram. Baixe para Android.'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'https://www.easygetinsta.com/pt/get-instagram-followers'
        }
      ]
    };
  },
  mounted() {
  },
  methods: {}
};
</script>


