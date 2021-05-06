const webpack = require('webpack')
const description = 'A unique identity for community members to enter into the Harmony dApp ecosystem.'

module.exports = {
  ssr: false,

  publicRuntimeConfig: {
    WEB3_URL: process.env.WEB3_URL,
    ENS_ADDRESS: process.env.ENS_ADDRESS
  },

  /*
    ** Headers of the page
    */
  head: {
    title: 'Crazy ONE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:image', property: 'og:image', content: 'https://beta.crazy.one/images/social.png' },
      { hid: 'twitter:image', property: 'twitter:image', content: 'https://beta.crazy.one/images/social.png' },
      { hid: 'twitter:description', property: 'twitter:description', content: description },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
    ** Customize the progress-bar color
    */
  loading: { color: '#1946FF' },
  /*
    ** Global CSS
    */
  css: [],

  /*
    ** Plugins to load before mounting the App
    */
  plugins: [
    { src: './plugins/subdomain.js' }
  ],
  /*
    ** Nuxt.js dev-modules
    */
  buildModules: [],

  /*
    ** Nuxt.js modules
    */
  modules: [],

  toast: {
    position: 'top-center'
  },

  serverMiddleware: [],

  proxy: {
    '/api': {
      target: '/.netlify/functions/dns',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },

  generate: {
    fallback: true
  },

  /*
    ** Build configuration
    */
  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    collapseBooleanAttributes: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    trimCustomFragments: true,
    useShortDoctype: true,
    extractCSS: true,
    extend(config, ctx) {},
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ]
  },
  srcDir: 'src/',
  rootDir: './'
}
