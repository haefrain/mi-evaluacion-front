import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const answer = {}
const answers= []
export const useAnswerStore = defineStore("AnswerStore", {
    state: () => {
        return {
            answer,
            answers,
        }
    },

    actions: {
        async index() {
            const result = await get('answers')
            if (result.success) {
                this.answers = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('answers', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('answers', id)
            if (result.success) {
                this.answer = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('answers', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('answers', id)
        },
    },

    getters: {
        getQuestion: (state) => state.answer,
        getQuestions: (state) => state.answers,
    },

    persist: true,
})