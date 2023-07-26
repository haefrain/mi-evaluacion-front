import { getCookie } from './cookies'

const API_PATH = 'http://localhost:8000/api'

async function get(route, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH}/${route}`,
        getOptions('GET', payload, withToken, headers)
    ).then((response) => {
        data = response.data.value
        success = true
    }).catch((error) => {
        data = error
    })
    return {success, data}
}

async function post(route, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH}/${route}`,
        getOptions('POST', payload, withToken, headers)
    ).then((response) => {
        data = response.data.value
        success = true
    }).catch((error) => {
        data = error
    })
    return {success, data}
}

async function getFind(route, id, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH}/${route}/${id}`,
        getOptions('GET', payload, withToken, headers)
    ).then((response) => {
        data = response.data.value
        success = true
    }).catch((error) => {
        data = error
    })
    return {success, data}
}

async function put(route, id, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH}/${route}/${id}`,
        getOptions('PUT', payload, withToken, headers)
    ).then((response) => {
        data = response.data.value
        success = true
    }).catch((error) => {
        data = error
    })
    return {success, data}
}

async function destroy(route, id, payload = {}, withToken = true, headers = {}) {
    let data = null
    let success = false
    await useFetch(
        `${API_PATH}/${route}/${id}`,
        getOptions('DELETE', payload, withToken, headers)
    ).then((response) => {
        data = response.data.value
        success = true
    }).catch((error) => {
        data = error
    })
    return {success, data}
}

function getOptions(method, payload, withToken, headers) {
    let options = {}
    if (['GET', 'POST'].indexOf(method) > -1) {
        options = { ...options, method}
    } else {
        options = { ...options, method: 'POST'}
        payload = {...payload, '_method': method}
    }


    if (withToken) {
        const authStore = getCookie('AuthStore')
        console.log(authStore)
        options = { ...options, headers: { 'Authorization': 'Bearer ' + authStore.token, ...headers, 'Content-Type': 'application/json', 'Accept': 'application/json' },}
    } else {
        options = { ...options, headers: {...headers, 'Content-Type': 'application/json', 'Accept': 'application/json'} }
    }

    options = { ...options, body: payload}

    return options
}

export { get, post, getFind, put, destroy }