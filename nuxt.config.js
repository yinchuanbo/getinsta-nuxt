process.env.DEBUG = 'nuxt:*';
import redirectSSL from 'redirect-ssl';

export default {
    srcDir: 'src/',
    ssr: true,
    mode: "universal",
    // 测试环境开启 debug 模式
    debug: process.env.NODE_ENV !== 'production',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    hooks: {
        'vue-renderer:ssr:context' (context) {
            const routePath = JSON.stringify(context.nuxt.routePath);
            context.nuxt = { serverRendered: true, routePath }
        }
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
        { src: '@/plugins/element.config.js' },
        { src: '@/plugins/utils.js', mode: 'client' },
        { src: '@/plugins/model-box.js', mode: 'client' },
        { src: '@/plugins/vee-validate.js', mode: 'client' },
        { src: '@/plugins/click-outside.js', mode: 'client' },
        { src: '@/plugins/constant.js' },
        { src: '@/plugins/base64.js' }
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
            name: 'GetInsta',
            lang: 'en',
            themeColor: '#7C56FF'
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            sass: {
                implementation: require('sass')
            }
        },
        extractCSS: {
            ignoreOrder: true
        }
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        proxy: true,
        // baseURL: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest'
        baseURL: process.env.NODE_ENV === 'production' ?
            'https://api.easygetinsta.com/api' :
            'https://test.easygetinsta.com/test/api', // 对asyncData中的接口刷新页面有效
        prefix: process.env.NODE_ENV === 'production' ?
            'https://api.easygetinsta.com/api' :
            '/dev/test/api',
        credentials: false // 跨域请求时是否需要使用凭证
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
        // '/prod': {
        //   target: 'https://api.easygetinsta.com',
        //   pathRewrite: {
        //     '^/prod': '',
        //     changeOrigin: true
        //   }
        // }
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
        // port:
        //   process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionTest'
        //     ? '8080' : '3000'
        port: 80
    }
};