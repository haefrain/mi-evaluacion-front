import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const company = {}
const companies= []
export const useCompanyStore = defineStore("CompanyStore", {
    state: () => {
        return {
            company,
            companies,
        }
    },

    actions: {
        async index() {
            const result = await get('companies')
            if (result.success) {
                this.companies = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('companies', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('companies', id)
            if (result.success) {
                this.company = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('companies', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('companies', id)
        },
    },

    getters: {
        company: (state) => state.company,
        companies: (state) => state.companies,
    },

    persist: true,
})