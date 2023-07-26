import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const typeAppointment = {}
const typeAppointments= []
export const useTypeAppointmentStore = defineStore("TypeAppointmentStore", {
    state: () => {
        return {
            typeAppointment,
            typeAppointments,
        }
    },

    actions: {
        async index() {
            const result = await get('typeAppointments')
            if (result.success) {
                this.typeAppointments = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('typeAppointments', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('typeAppointments', id)
            if (result.success) {
                this.typeAppointment = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('typeAppointments', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('typeAppointments', id)
        },
    },

    getters: {
        getTypeAppointment: (state) => state.typeAppointment,
        getTypeAppointments: (state) => state.typeAppointments,
    },

    persist: true,
})