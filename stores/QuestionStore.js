import { defineStore } from "pinia";
import {post} from "~/utils/requests";

const question = {}
const questions= []
export const useQuestionStore = defineStore("QuestionStore", {
    state: () => {
        return {
            question,
            questions,
        }
    },

    actions: {
        async index(page = 1) {
            const result = await get('questions', {page})
            if (result.success) {
                this.questions = result.data.data
            }
            return result
        },
        async store(payload) {
            return await post('questions', payload)
        },
        async show(payload) {
            const { id } = payload
            const result = await getFind('questions', id)
            if (result.success) {
                this.question = result.data.data
            }
            return result
        },
        async update(payload) {
            const { id } = payload
            return await put('questions', id, payload)
        },
        async destroy(payload) {
            const { id } = payload
            return await destroy('questions', id)
        },
    },

    getters: {
        getQuestion: (state) => state.question,
        getQuestions: (state) => state.questions,
    },

    persist: true,
})