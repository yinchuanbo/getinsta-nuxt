<template>
  <div class="page-text">
    <div class="header-blank"></div>
    <div class="wrapper">
      <div class="title">
        <h1>{{ $t('protocol.termsOfService.title') }}</h1>
        <p>{{ $t('protocol.lastUpdated') }} {{ $t('protocol.termsOfService.lastUpdatedDate') }}</p>
      </div>
      <div class="content">
        <p>{{ $t('protocol.termsOfService.content.p0') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p1') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p2') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p3') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p4') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p5') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p6') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p7') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p8') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p9') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p10') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p11') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p12') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p13') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p14') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p15') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p16') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p17') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p18') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p19') }}</h2>
        <p>
          {{ $t('protocol.termsOfService.content.p20') }}
          <router-link to="/privacy">{{ $t('protocol.termsOfService.content.p21') }}</router-link>
          {{ $t('protocol.termsOfService.content.p22') }}
        </p>
        <p>{{ $t('protocol.termsOfService.content.p23') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p24') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p25') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p26') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p27') }}</p>
        <p>{{ $t('protocol.termsOfService.content.p28') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p29') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p30') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p31') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p32') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p33') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p34') }}</p>

        <h2>{{ $t('protocol.termsOfService.content.p35') }}</h2>
        <p>{{ $t('protocol.termsOfService.content.p36') }}</p>


        <h2>{{ $t('protocol.termsOfService.content.p37') }}</h2>
        <p>
          {{ $t('protocol.termsOfService.content.p38') }}
          <a href="mailto:support@easygetinsta.com">{{ $t('protocol.termsOfService.content.p39') }}</a>
          {{ $t('protocol.termsOfService.content.p40') }}
        </p>

        <h2>{{ $t('protocol.termsOfService.content.p41') }}</h2>
        <p>
          {{ $t('protocol.termsOfService.content.p42') }}
          <a href="mailto:support@easygetinsta.com">{{ $t('protocol.termsOfService.content.p43') }}</a>
          {{ $t('protocol.termsOfService.content.p44') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  metaInfo() {
    return {
      title: 'GetInsta - Terms of Use',
      meta: [
        {
          name: 'description',
          content: 'Learn about the legal and fair use of applications ("app", "software") or "services" of GetInsta.'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: `${window.location.origin}${this.$nuxt.$route.path}`
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped src="../../assets/styles/pages/protocol.scss"></style>
