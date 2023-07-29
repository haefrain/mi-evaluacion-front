import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const person = {}
const people= []
export const usePersonStore = defineStore("PersonStore", {
    state: () => {
        return {
            person,
            people,
        }
    },

    actions: {
        async index() {
            const result = await get('people')
            if (result.success) {
                this.people = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('people', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('people', id)
            if (result.success) {
                this.person = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('people', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('people', id)
        },
    },

    getters: {
        person: (state) => state.person,
        people: (state) => state.people,
    },

    persist: true,
})