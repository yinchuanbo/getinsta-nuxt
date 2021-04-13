<template>
  <div class="blog">
    <!--<blog0-title />-->
    <blog-title-v2 :blog-id="0" />
    <blog1-content />
  </div>
</template>

<script>
// import Blog0Title from '@/views/blog/blog-list/views/blog-0-title';
import Blog1Content from '@/views/blog/blog-list/views/blog-1-content';
import BlogTitleV2 from '@/views/blog/static-modules/blog-title-v2/blog-title-v2';

export default {
  name: 'Blog',
  components: {
    BlogTitleV2,
    Blog1Content
    // Blog0Title
  }
};
</script>
