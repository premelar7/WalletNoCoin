<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'App Title' },
  ],
  link: [
    { rel: "apple-touch-icon", href: "portal.kirimsms.id/_nuxt/img/kirimLogoX2.8fa05d8.png" },
    { rel: "apple-touch-startup-image", href: "portal.kirimsms.id/_nuxt/img/kirimLogoX2.8fa05d8.png" }
  ]
})
</script>
