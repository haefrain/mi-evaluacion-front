import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const corporativeGroup = {}
const corporativeGroups= []
export const useCorporativeGroupStore = defineStore("CorporativeGroupStore", {
    state: () => {
        return {
            corporativeGroup,
            corporativeGroups,
        }
    },

    actions: {
        async index() {
            const result = await get('corporativeGroups')
            if (result.success) {
                this.corporativeGroups = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('corporativeGroups', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('corporativeGroups', id)
            if (result.success) {
                this.corporativeGroup = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('corporativeGroups', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('corporativeGroups', id)
        },
    },

    getters: {
        getCorporativeGroup: (state) => state.corporativeGroup,
        getCorporativeGroups: (state) => state.corporativeGroups,
    },

    persist: true,
})