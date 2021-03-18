<template>
  <div class="page-text">
    <div class="header-blank"></div>
    <div class="wrapper">
      <div class="title">
        <h1>{{ $t('protocol.privacyPolicy.title') }}</h1>
        <p>{{ $t('protocol.lastUpdated') }} {{ $t('protocol.privacyPolicy.lastUpdatedDate') }}</p>
      </div>
      <div class="content">
        <p>{{ $t('protocol.privacyPolicy.content.p0') }}</p>
        <p>{{ $t('protocol.privacyPolicy.content.p1') }}</p>
        <p>
          {{ $t('protocol.privacyPolicy.content.p2') }}
          <a href="mailto:support@easygetinsta.com">
            {{ $t('protocol.privacyPolicy.content.p3') }}
          </a>{{ $t('protocol.privacyPolicy.content.p4') }}
        </p>

        <h2>{{ $t('protocol.privacyPolicy.content.p5') }}</h2>
        <p>{{ $t('protocol.privacyPolicy.content.p6') }}</p>
        <ul>
          <li>{{ $t('protocol.privacyPolicy.content.p7') }}</li>
          <li>{{ $t('protocol.privacyPolicy.content.p8') }}</li>
          <li>{{ $t('protocol.privacyPolicy.content.p9') }}</li>
          <li>{{ $t('protocol.privacyPolicy.content.p10') }}</li>
          <li>{{ $t('protocol.privacyPolicy.content.p11') }}</li>
          <li v-if="$i18n.locale !== 'de'">{{ $t('protocol.privacyPolicy.content.p12') }}</li>
        </ul>
        <p>{{ $t('protocol.privacyPolicy.content.p13') }}</p>

        <h2>{{ $t('protocol.privacyPolicy.content.p14') }}</h2>
        <p>{{ $t('protocol.privacyPolicy.content.p15') }}</p>
        <ul>
          <li>{{ $t('protocol.privacyPolicy.content.p16') }}</li>
          <li>{{ $t('protocol.privacyPolicy.content.p17') }}</li>
          <li>{{ $t('protocol.privacyPolicy.content.p18') }}</li>
          <li>
            {{ $t('protocol.privacyPolicy.content.p19') }}
            <a target="_blank" href="https://www.talkingdata.com/safety.jsp">{{ $t('protocol.privacyPolicy.content.p20') }}</a>
            {{ $t('protocol.privacyPolicy.content.p21') }}
            <a target="_blank" href="https://www.talkingdata.com/privacy.jsp">https://www.talkingdata.com/privacy.jsp</a>
            {{ $t('protocol.privacyPolicy.content.p22') }}
            <a target="_blank" href="https://www.talkingdata.com/optout.jsp">https://www.talkingdata.com/optout.jsp</a>
            {{ $t('protocol.privacyPolicy.content.p23') }}
          </li>
          <li>{{ $t('protocol.privacyPolicy.content.p24') }}</li>
        </ul>
        <p>{{ $t('protocol.privacyPolicy.content.p25') }}</p>

        <h2>{{ $t('protocol.privacyPolicy.content.p26') }}</h2>
        <p>{{ $t('protocol.privacyPolicy.content.p27') }}</p>

        <h2>{{ $t('protocol.privacyPolicy.content.p28') }}</h2>
        <p>{{ $t('protocol.privacyPolicy.content.p29') }}</p>

        <h2>{{ $t('protocol.privacyPolicy.content.p30') }}</h2>
        <p>
          {{ $t('protocol.privacyPolicy.content.p31') }}
          <a href="mailto:support@easygetinsta.com">{{ $t('protocol.privacyPolicy.content.p32') }}</a>
          {{ $t('protocol.privacyPolicy.content.p33') }}
        </p>

        <h2>{{ $t('protocol.privacyPolicy.content.p34') }}</h2>
        <p>{{ $t('protocol.privacyPolicy.content.p35') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  metaInfo() {
    return {
      title: 'GetInsta - Privacy Policy',
      meta: [
        {
          name: 'description',
          content: 'Since GetInsta is committed to protecting your privacy, there is no need to worry about the security of your personal information.'
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
