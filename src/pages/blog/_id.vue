<template>
  <div class="blog">
    <instance-detail v-if="isInstanceDetail" :req-obj="reqObj" />
    <instance-list v-if="!isInstanceDetail" />
  </div>
</template>

<script>
import instanceDetail from '@/views/blog/blog-detail/blog-detail';
import instanceList from '@/views/blog/blog-list/blog-list';
import blogApi from '@/api/api.blog';

export default {
  components: { instanceDetail, instanceList },
  async asyncData({ route, req, app, redirect, error, isDev }) {
    // return data
    let DATA = {
      isInstanceDetail: true,
      hostname: process.server ? req.headers.host : location.hostname,
      reqObj: {}
    };

    // ***********************************************************************

    // article ID
    const paramID = route.params.id;
    if (!paramID) { // 列表页
      DATA.isInstanceDetail = false;
    } else { // 详情页
      const idArray = paramID.split('-');
      const articleID = idArray.pop();
      if (typeof articleID !== 'string') return;
      // if (isDev) console.log('articleID', articleID);

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
          app.title = DATA.reqObj['seo_title'];
        } else {
          if (res['redirect_url']) {
            redirect(301, res['redirect_url']);
          } else {
            error({ statusCode: 404 });
          }
        }
      } catch (err) {
        console.log('blog detail error:', err);
        error({ statusCode: 500 });
      }
    }

    return DATA;
  },
  head() {
    return {
      title: this.isInstanceDetail ? this.reqObj['article']['seo_title'] || '' : this.$t('blog.meta.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.isInstanceDetail ? this.reqObj['article']['remark'] || '' : this.$t('blog.meta.description')
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: `https://${this.hostname}${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'en',
          href: `https://${this.hostname}${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'fr',
          href: `https://fr.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'de',
          href: `https://de.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'es',
          href: `https://es.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'ar',
          href: `https://ar.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'it',
          href: `https://it.easygetinsta.com${this.$nuxt.$route.path}`
        },
        {
          rel: 'alternate',
          hreflang: 'pt',
          href: `https://pt.easygetinsta.com${this.$nuxt.$route.path}`
        }
      ]
    };
  }
};
</script>
