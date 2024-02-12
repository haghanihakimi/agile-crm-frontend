// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  nitro: {
    compressPublicAssets: {
      brotli: true
    }
  },
  experimental: {
    componentIslands: true // false or 'local+remote'
  },
  $production: {
    routeRules: {
      '/**': { isr: true }
    }
  },
  runtimeConfig: {
    apiSecret: '',
    public: {
      backendDomain: "http://localhost:443"
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxt/image',
    '@ant-design-vue/nuxt',
    '@vueuse/nuxt',
    'dayjs-nuxt',
  ],
  image: {
    inject: true,
    quality: 80,
    format: ['webp'],
    dir: 'assets/images',
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 64,
          height: 64
        }
      },
    }
  },
  plugins: [
    '~/plugins/day-time',
    '~/plugins/plural',
    '~/plugins/fetch-data',
  ]
})