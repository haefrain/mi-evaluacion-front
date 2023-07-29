const ROLE_NAME_TO_EVALUATION = 'user'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useCookie('AuthStore').value
    if ((!authStore || authStore.isLoggedIn === false) && to.fullPath !== '/login') {
        return navigateTo('/login')
    }

    if ((authStore && authStore.isLoggedIn && authStore.authUser.role.name === ROLE_NAME_TO_EVALUATION) && to.fullPath === '/login') {
        return navigateTo('/questionary')
    }

    if ((authStore && authStore.isLoggedIn && authStore.authUser.role.name !== ROLE_NAME_TO_EVALUATION) && to.fullPath === '/login') {
        return navigateTo('/')
    }
})