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
    { src: './assets/styles/reset.scss', lang: 'scss' },
    { src: './assets/styles/fonts.scss', lang: 'scss' },
    { src: './assets/styles/global.scss', lang: 'scss' }
  ],

  styleResources: {
    scss: [
      './assets/styles/mixin.scss'
    ]
  },

  // top loading bar
  loading: {
    color: '#f55',
    height: '2px'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/common.js' },
    { src: '@/plugins/eventBus.js', mode: 'client' },
    { src: '@/plugins/utils.js' },
    { src: '@/plugins/utils-axios.js' },
    { src: '@/plugins/utils-veeValidate.js', mode: 'client' }
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
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics'
  ],

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
    prefix: process.env.NODE_ENV === 'production' ? '' : '/dev',
    credentials: true // 表示跨域请求时是否需要使用凭证
  },

  // Proxy Config
  proxy: {
    '/dev': {
      target: 'https://test.easygetinsta.com',
      // changeOrigin: true,
      // ws: true,
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
