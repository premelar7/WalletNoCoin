// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "Money W.N.C",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'WNC Money' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/title.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/title.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/title.png' },
        { rel: 'apple-touch-iconapple-touch-startup-image', href: '/icons/title.png' }
      ]
    }
  },
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;'
        }
      }
    }
  },
  css: ['~/assets/css/main.scss']
})
