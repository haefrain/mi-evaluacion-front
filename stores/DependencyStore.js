import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const dependency = {}
const dependencies= []
export const useDependencyStore = defineStore("DependencyStore", {
    state: () => {
        return {
            dependency,
            dependencies,
        }
    },

    actions: {
        async index() {
            const result = await get('dependencies')
            if (result.success) {
                this.dependencies = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('dependencies', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('dependencies', id)
            if (result.success) {
                this.dependency = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('dependencies', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('dependencies', id)
        },
    },

    getters: {
        getDependency: (state) => state.dependency,
        getDependencies: (state) => state.dependencies,
    },

    persist: true,
})