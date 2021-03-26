<template>
  <div class="affiliate">
    <affiliate0-top />
    <affiliate1-monetize />
    <affiliate2-steps />
    <affiliate3-commission />
    <affiliate4-contact />
  </div>
</template>

<script>
import Affiliate0Top from './views/affiliate-0-top/affiliate-0-top';
import Affiliate1Monetize from './views/affiliate-1-monetize/affiliate-1-monetize';
import Affiliate2Steps from './views/affiliate-2-steps/affiliate-2-steps';
import Affiliate3Commission from './views/affiliate-3-commission/affiliate-3-commission';
import Affiliate4Contact from './views/affiliate-4-contact/affiliate-4-contact';

export default {
  name: 'Affiliate',
  components: { Affiliate4Contact, Affiliate3Commission, Affiliate2Steps, Affiliate1Monetize, Affiliate0Top },
  metaInfo() {
    return {
      title: 'GetInsta Affiliate Program - earn up to 30% commission rates',
      link: [
        {
          rel: 'canonical',
          href: `${window.location.origin}${this.$route.path}`
        }
      ]
    };
  },
  data: () => ({}),
  mounted() {
  },
  methods: {}
};
</script>

<style scoped lang="scss"></style>
