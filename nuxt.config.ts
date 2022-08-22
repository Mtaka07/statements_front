import type { NuxtConfig } from '@nuxt/types';
require('dotenv').config();
const environment = process.env.NODE_ENV || 'development'
const envSet = require(`./env.${environment}.ts`)
const config: NuxtConfig = {
  dev: process.env.NODE_ENV !== "production",
  ssr: false,
  head: {
    title: 'statements_front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: envSet,
  build: {
    extend: (config) => {
      config.node = {
        fs: 'empty'
      }
    }
  },
  server: {
    port: 3002,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/vee-validate'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios'
  ],

  auth: {
    redirect: {
      login: '/login/',
      callback: false,
      home: false
    },
    strategies: {
    //localという認証方法を使う場合
      local: {
        //axiosでアクセスする際の設定
        endpoints: {
          login: { 
            url: envSet.API_URL + '/api/login', 
            method: 'post', 
            propertyName: 'data.api_token',
            headers: {
              'content-Type': 'application/json'
            } 
          },
          user: {
            url: envSet.API_URL + '/api/member', 
            method: 'get', 
            propertyName: 'data', 
          },
          logout: false
        }
      }
    }
  },
}
declare module 'vue/types/vue' {
  interface Vue {
    $auth: any
  }
}
export default config
