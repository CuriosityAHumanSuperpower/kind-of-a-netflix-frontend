export default {
  //debug 
  // debug : true,
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Kind of a Netflix',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }, 
      { name : "google-signin-client_id",  content : '257164479848-hr8b3ql5240s4rjk5o1ghulk5mdtt4k5.apps.googleusercontent.com'}, 
      { name: 'google-signin-scope', content: 'profile email' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ], 
    script: [
      {src : "https://apis.google.com/js/platform.js?onload=login", async : true, defer :true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-social-sharing/nuxt', 
    // '@nuxtjs/google-adsense'
  ],

  axios : {
    baseURL : process.env.BASE_URL || 'http://localhost:3030/api', // ,
  },

  bootstrapVue: {
    icons: true,
  },

  loading: {
    color: '#c82333',
    height: '5px'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
/*
  'google-adsense': {
    id: 'ca-pub-7545703529212767'
  },
*/
  auth: {
    resetOnError : true, 
    watchLoggedIn: true,
    strategies: {
/*      google: {
            clientId: '257164479848-hr8b3ql5240s4rjk5o1ghulk5mdtt4k5.apps.googleusercontent.com',
            codeChallengeMethod: '',
            responseType: 'code',
            endpoints: {
              login: { url: 'http://localhost:3030/api/login/google', method: 'post', propertyName: 'token' },
              // logout: { url: '', method: 'post' },
              user: { url: 'http://localhost:3030/api/user/info', method: 'get', propertyName: 'user' }
            },
      },*/
      local: {
        token: {
          property: 'token',
          // required: true,
          type: 'Bearer', 
          maxAge : 3600,
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: 'login/google', method: 'post', propertyName: 'token' },
          // logout: { url: '', method: 'post' },
          user: { url: 'user/info', method: 'get', propertyName: 'user' }
        }
      }
    }
  },
}
