// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css'
    ],
    build: {
        transpile: ['vuetify'],
    },
    $production: {
        devtools: { enabled: false }
    },
    $development: {
        devtools: { enabled: true }
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@vee-validate/nuxt',
    ],
    app: {
        middlewares: [
            '~/middleware/authenticationMiddleware',
        ],
    },
})