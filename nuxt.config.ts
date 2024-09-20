// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  // modules: ['nuxt-electron'],
  // electron: {
  //   build: [
  //     {
  //       entry: 'electron/main.ts'
  //     }
  //   ]
  // }
  devServer: {
    port: 8000
  },
  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },

  modules: ['@nuxt/ui']
})
