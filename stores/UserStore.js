import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const user = {}
const users= []
export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            user,
            users,
        }
    },

    actions: {
        async index() {
            const result = await get('users')
            if (result.success) {
                this.users = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('users', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('users', id)
            if (result.success) {
                this.user = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('users', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('users', id)
        },
    },

    getters: {
        user: (state) => state.user,
        users: (state) => state.users,
    },

    persist: true,
})