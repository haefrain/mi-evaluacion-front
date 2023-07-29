import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const statistic = {}
export const useDashboardStore = defineStore("DashboardStore", {
    state: () => {
        return {
            statistic
        }
    },

    actions: {
        async index() {
            const result = await get('dashboard')
            if (result.success) {
                this.statistic = result.data
            }
            return result
        },
        async exportParticipants() {
            return await post('export/participants', null, true, {'Content-Type': 'application/xlsx'})
        },
    },

    getters: {
        getStatistic: (state) => state.statistic,
    },

    persist: false,
})