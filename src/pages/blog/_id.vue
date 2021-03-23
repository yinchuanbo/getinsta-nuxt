<template>
  <instance :req-obj="reqObj" />
</template>

<script>
import instance from '@/views/blog/blog-detail/blog-detail';
import blogApi from '@/api/api.blog';

export default {
  components: { instance },
  async asyncData(ctx) {
    // article ID
    const paramID = ctx.route.params.id;
    const idArray = paramID.split('-');
    const articleID = idArray.pop();
    if (typeof articleID !== 'string') return;
    console.log('articleID', articleID);

    // return data
    let DATA = {
      hostname: process.server ? ctx.req.headers.host : location.hostname,
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
      let res = await ctx.app.$axios.get(
        blogApi.getBlogDetailV2,
        { params: apiParams }
      );
      console.log('res', res);

      if (res['data'].status === 'ok') {
        DATA.reqObj = res;
      } else {
        if (res['data']['redirect_url']) {
          ctx.redirect(302, res['data']['redirect_url']);
        } else {
          ctx.error({ statusCode: 404 });
        }
      }
    } catch (err) {
      console.log('blog detail error:', err);
      ctx.error({ statusCode: 500 });
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


