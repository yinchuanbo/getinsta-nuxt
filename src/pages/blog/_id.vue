<template>
  <instance />
</template>

<script>
import instance from '@/views/blog/blog-list/blog-list';
import blogApi from '@/api/api.blog';

export default {
  components: { instance },
  async asyncData(ctx) {
    const idArray = ctx.route.params.id.split('-');
    const articleID = idArray.pop();
    // let dataObj = {
    //   hostname: "",
    //   articleObj: {},
    // };
    await ctx.app.$axios.get(blogApi.getBlogDetail, {
      params: { id: articleID }
    }).then((res) => {
      if (idArray.join('-') !== res.data.data.seo_url) {
        ctx.error({ statusCode: 404 });
        return;
      }
      ctx.store.commit('setArticleObj', res.data.data);
      return { hostname: process.server ? ctx.req.headers.host : location.hostname };
    }).catch((err) => {
      ctx.error({ statusCode: err.statusCode });
    });
  },
  head() {
    return {
      title: `${this.$store.state.articleObj['seo_title']}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$store.state.articleObj['meta_description']
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


