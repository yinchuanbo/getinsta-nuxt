<template>
  <div class="faq">
    <div class="header-blank"></div>
    <faq1-form />
  </div>
</template>

<script>
import Faq1Form from '@/views/faq/views/faq-1-form/faq-1-form';

export default {
  name: 'Feedback',
  components: {
    Faq1Form
  },
  data() {
    return {};
  },
  metaInfo() {
    return {
      title: 'GetInsta Support Center - Feedback',
      meta: [
        {
          name: 'description',
          content: 'We still love you. (￣∇￣)'
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
  mounted() {
    this.appChannelJump();
    // if (
    //   this.COMMON.getURLQuery('utm_source') === 'android_release'
    //   && location.hostname === 'www.easygetinsta.com'
    // )
    //   location.href = `https://www.techmeups.com/feedback${location.search}`;
  },
  methods: {
    appChannelJump() {
      const urlQueryVariables = this.COMMON.getURLQueryWithDecodeURI('variables');
      const variablesObj = JSON.parse(urlQueryVariables);
      // console.log('urlQueryVariables', variablesObj);
      const channelArray = ['gp_followinsta', 'gp_enpaid', 'gp_multi'];

      if (variablesObj && channelArray.indexOf(variablesObj.channel) > -1)
        location.href = `https://www.techmeups.com/feedback${location.search}`;
    }
  }
};
</script>


