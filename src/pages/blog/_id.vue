<template>
  <instance :req-obj="reqObj" />
</template>

<script>
import instance from '@/views/blog/blog-detail/blog-detail-example';
import blogApi from '@/api/api.blog';

export default {
  components: { instance },
  async asyncData(ctx) {
    const idArray = ctx.route.params.id.split('-');
    const articleID = idArray.pop();
    console.log('articleID', articleID);

    // request
    const res = await ctx.app.$axios.get(
      blogApi.getBlogDetail,
      {
        params: { id: articleID }
      }
    );

    console.log('res', res);

    // data return
    return {
      hostname: process.server ? ctx.req.headers.host : location.hostname,
      reqObj: res
    };

    // await ctx.app.$axios.get(blogApi.getBlogDetail, {
    //   params: { id: articleID }
    // }).then((res) => {
    //   if (idArray.join('-') !== res.data.data['seo_url']) {
    //     ctx.error({ statusCode: 404 });
    //     return;
    //   }
    //   ctx.store.commit('setArticleObj', res.data.data);
    //   return {
    //     hostname: process.server ? ctx.req.headers.host : location.hostname,
    //     articleObj: res.data.data
    //   };
    // }).catch((err) => {
    //   ctx.error({ statusCode: err.statusCode });
    // });
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


