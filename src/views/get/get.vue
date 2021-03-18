<template>
  <div class="get">
    <get0-banner />
    <get1-add id="get-add" />
    <get2-why />
    <get3-now />
  </div>
</template>

<script>
import Get0Banner from '@/views/get/views/get-0-banner';
import Get1Add from '@/views/get/views/get-1-add';
import Get2Why from '@/views/get/views/get-2-why';
import Get3Now from '@/views/get/views/get-3-now';

export default {
  name: 'Get',
  components: {
    Get3Now,
    Get2Why,
    Get1Add,
    Get0Banner
  }
};
</script>
