import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css' },
      {rel: 'stylesheet', href: '"https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  // axios
  axios: {
    //baseURL: 'https://eworks-staged.onrender.com/api',
    baseURL: process.env.NODE_ENV !== "production" ? 'http://localhost:4000/api' : "https://distorted-lumpy-solenodon.gigalixirapp.com//api",
    credentials: false,
    proxyHeaders: false
  },

  // auth
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/account/login', method: 'post', propertyName: 'data.token' },
          logout: { url: '/account/logout', method: 'post' },
          user: { url: '/account/user', method: 'get', propertyName: 'data.user'}
        },
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
 vuetify: {
  optionsPath: './vuetify.options.js',
  theme: {
    dark: false,
    themes: {
      options: {
        customProperties: true
      },
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      },
      light: {
        background: "#dfe3ee"
      },
    },
    treeshake: true,
    defaultAssets: {
      font: false
    }
  }
},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
