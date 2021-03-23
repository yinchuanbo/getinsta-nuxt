<template>
  <instance :req-obj="reqObj" />
</template>

<script>
import instance from '@/views/blog/blog-detail/blog-detail';
import blogApi from '@/api/api.blog';
import Crypto from 'crypto-js';

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
    let returnData = {
      hostname: process.server ? ctx.req.headers.host : location.hostname,
      reqObj: {}
    };

    let apiParams = {
      article_id: articleID,
      client_lan: 'en',
      page_url: paramID
    };

    const paramStr = JSON.stringify(apiParams);
    let msg = paramStr;
    let key = 'd4c66a7888fb21c173407d697bc67d92afac1b15ec02d7aaa3cc6a04c2c7b2cf';
    let hash = Crypto['HmacSHA256'](msg, key).toString();
    const paramSigned = {
      'signed_body': hash + '.' + paramStr,
      'sign_version': 1
    };

    // request
    try {
      let res = await ctx.app.$axios.post(
        blogApi.getBlogDetail,
        paramSigned
      );
      console.log('res', res);

      if (res['data'].status === 'ok') {
        returnData.reqObj = res;
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

    return returnData;
  },
  head() {
    return {
      // title: this.reqObj['seo_title'],
      title: 1,
      meta: [
        {
          hid: 'description',
          name: 'description',
          // content: this.reqObj['remark']
          content: 2
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


