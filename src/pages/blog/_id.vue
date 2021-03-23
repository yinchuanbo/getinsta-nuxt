<template>
  <instance :req-obj="reqObj" />
</template>

<script>
import instance from '@/views/blog/blog-detail/blog-detail';
import blogApi from '@/api/api.blog';

export default {
  components: { instance },
  async asyncData({ route, req, app, redirect, error, isDev }) {
    // article ID
    const paramID = route.params.id;
    const idArray = paramID.split('-');
    const articleID = idArray.pop();
    if (typeof articleID !== 'string') return;
    // if (isDev) console.log('articleID', articleID);

    // return data
    let DATA = {
      hostname: process.server ? req.headers.host : location.hostname,
      reqObj: {}
    };

    let apiParams = {
      article_id: articleID,
      client_lan: 'en',
      page_url: paramID,
      accept_lan: 'en'
    };

    // request
    try {
      let res = await app.$axios.$get(
        blogApi.getBlogDetailV2,
        { params: apiParams }
      );
      // if (isDev) console.log('res:', res);

      if (res['status'] === 'ok') {
        DATA.reqObj = res;
      } else {
        if (res['redirect_url']) {
          redirect(302, res['redirect_url']);
        } else {
          error({ statusCode: 404 });
        }
      }
    } catch (err) {
      console.log('blog detail error:', err);
      error({ statusCode: 500 });
    }

    return DATA;
  },
  head() {
    return {
      title: this.reqObj['seo_title'] || '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.reqObj['remark'] || ''
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://${this.hostname}${this.$nuxt.$route.path}`
        }
      ]
    };
  }
};
</script>


