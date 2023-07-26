import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const position = {}
const positions= []
export const usePositionStore = defineStore("PositionStore", {
    state: () => {
        return {
            position,
            positions,
        }
    },

    actions: {
        async index() {
            const result = await get('positions')
            if (result.success) {
                this.positions = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('positions', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('positions', id)
            if (result.success) {
                this.position = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('positions', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('positions', id)
        },
    },

    getters: {
       getPosition: (state) => state.position,
       getPositions: (state) => state.positions,
    },

    persist: true,
})