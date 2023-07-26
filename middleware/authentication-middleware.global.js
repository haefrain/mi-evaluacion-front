export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useCookie('AuthStore').value
    if ((!authStore || authStore.isLoggedIn === false) && to.fullPath !== '/login') {
        return navigateTo('/login')
    }

    if ((authStore && authStore.isLoggedIn) && to.fullPath === '/login') {
        return navigateTo('/')
    }
})