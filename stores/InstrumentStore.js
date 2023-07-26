import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const instrument = {}
const instruments= []
export const useInstrumentStore = defineStore("InstrumentStore", {
    state: () => {
        return {
            instrument,
            instruments,
        }
    },

    actions: {
        async index() {
            const result = await get('instruments')
            if (result.success) {
                this.instruments = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('instruments', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('instruments', id)
            if (result.success) {
                this.instrument = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('instruments', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('instruments', id)
        },
    },

    getters: {
        instrument: (state) => state.instrument,
        instruments: (state) => state.instruments,
    },

    persist: true,
})