import { getCookie } from './cookies'

const API_PATH = 'http://localhost:8000'
const API_PATH_COMPLEMENT = `${API_PATH}/api`

const getToken = async () =>
{
    let token = useCookie("XSRF-TOKEN");
    if (!token.value) {
        let token = null
        await useFetch(`${API_PATH}/sanctum/csrf-cookie`, { credentials: 'include' }).then((response) => {
            token = useCookie("XSRF-TOKEN");
        })
    }

    return token.value
}

async function get(route, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH_COMPLEMENT}/${route}${convertToQueryParam(payload)}`,
        await getOptions('GET', null, withToken, headers)
    ).then((response) => {
        if (response.error.value) {
            data = response.error.value.data.message
            success = false
        } else {
            data = response.data.value
            success = true
        }
    })
    return {success, data}
}

async function post(route, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH_COMPLEMENT}/${route}`,
        await getOptions('POST', payload, withToken, headers)
    ).then((response) => {
        if (response.error.value) {
            data = response.error.value.data.message
            success = false
        } else {
            data = response.data.value
            success = true
        }
    })
    return {success, data}
}

async function forcePost(route, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH_COMPLEMENT}/${route}`,
        await getOptions('POST', payload, withToken, headers)
    ).then((response) => {
            data = response.data.value
            success = true
    })
    return {success, data}
}

async function getFind(route, id, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH_COMPLEMENT}/${route}/${id}`,
        await getOptions('GET', payload, withToken, headers)
    ).then((response) => {
        if (response.error.value) {
            data = response.error.value.data.message
            success = false
        } else {
            data = response.data.value
            success = true
        }
    })
    return {success, data}
}

async function put(route, id, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false

    await useFetch(
        `${API_PATH_COMPLEMENT}/${route}/${id}`,
        await getOptions('PUT', payload, withToken, headers)
    ).then((response) => {
        if (response.error.value) {
            data = response.error.value.data.message
            success = false
        } else {
            data = response.data.value
            success = true
        }
    })
    return {success, data}
}

async function destroy(route, id, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH_COMPLEMENT}/${route}/${id}`,
        await getOptions('DELETE', payload, withToken, headers)
    ).then((response) => {
        if (response.error.value) {
            data = response.error.value.data.message
            success = false
        } else {
            data = response.data.value
            success = true
        }
    })
    return {success, data}
}

async function getOptions(method, payload, withToken, headers) {
    let options = {}

    const tokenCsrf = await getToken()

    if (['GET', 'POST'].indexOf(method) > -1) {
        options = { ...options, method}
    } else {
        options = { ...options, method: 'POST'}
        payload = {...payload, '_method': method}
    }

    if (withToken) {
        const authStore = useCookie("AuthStore");
        options = { ...options, headers: { 'Authorization': 'Bearer ' + authStore.value.token, ...headers, 'Content-Type': 'application/json', 'Accept': 'application/json' },}
    } else {
        options = { ...options, headers: {...headers, 'Content-Type': 'application/json', 'Accept': 'application/json'} }
    }
    if (tokenCsrf) {
        options = { ...options, headers: {...options.headers, 'X-XSRF-TOKEN': tokenCsrf}}
    }

    if (method !== 'GET' && payload) {
        options = { ...options, body: payload}
    }

    return options
}

function convertToQueryParam(object)
{
    return '?' + Object.keys(object).map(key => {
        return `${key}=${encodeURIComponent(object[key])}`;
    }).join('&');
}

export { get, post, forcePost, getFind, put, destroy }