import redirectSSL from 'redirect-ssl';

export default {
  srcDir: 'src/',
  mode: 'universal',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '@/assets/styles/reset.scss', lang: 'scss' },
    { src: '@/assets/styles/fonts.scss', lang: 'scss' },
    { src: '@/assets/styles/global.scss', lang: 'scss' }
  ],

  styleResources: {
    scss: [
      '@/assets/styles/mixin.scss'
    ]
  },

  // top loading bar
  loading: {
    color: '#b33ba3',
    height: '2px'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/axios.js' },
    { src: '@/plugins/common.js' },
    { src: '@/plugins/utils.js', mode: 'client' },
    { src: '@/plugins/model-box.js', mode: 'client' },
    { src: '@/plugins/vee-validate.js', mode: 'client' },
    { src: '@/plugins/click-outside.js', mode: 'client' },
    { src: '@/plugins/constant.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
    'nuxt-i18n',
    '@nuxtjs/pwa', // https://go.nuxtjs.dev/pwa
    // @nuxtjs/axios组件是nuxt-18n中lazy功能的基础，需要放在nuxt-i18n后面
    '@nuxtjs/axios' // https://go.nuxtjs.dev/axios
  ],

  i18n: {
    langDir: '@/locales/', // 必要，locales中的file路径生效依赖此字段
    lazy: true, // 必要，locales中的file路径生效依赖此字段
    locales: [
      { code: 'en', iso: 'en', file: 'en.json', dir: 'ltr' }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  googleAnalytics: {
    id: 'UA-154640458-1'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass')
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    prefix: process.env.NODE_ENV === 'production'
      ? 'https://www.easygetinsta.com/api'
      : 'https://test.easygetinsta.com/api/dev/test/api',
    credentials: false // 表示跨域请求时是否需要使用凭证
  },

  // Proxy Config
  proxy: {
    '/dev': {
      target: 'https://test.easygetinsta.com',
      pathRewrite: {
        '^/dev': '',
        changeOrigin: true
      }
    }
  },

  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest',
      statusCode: 301
    })
  ],

  // Server Config
  server: {
    host: '0.0.0.0',
    port:
      process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest'
        ? '8080' : '3000'
  }
};
