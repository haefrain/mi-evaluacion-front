import { defineStore } from "pinia";
import { useQuestionStore } from "~/stores/QuestionStore";
import { useAuthStore } from "~/stores/AuthStore";

const actualPage = 25
const afterPage = 2
const beforePage = null
const totalPages = 999
const isFinished = false
const isShowDemographic = false
const isValidDemographic = false
const isShowIntroduction = true
export const useEvaluationStore = defineStore("EvaluationStore", {
    state: () => {
        return {
            actualPage,
            afterPage,
            beforePage,
            totalPages,
            isFinished,
            isShowDemographic,
            isValidDemographic,
            isShowIntroduction
        }
    },

    actions: {
        async goToQuestions() {
            const questionStore = useQuestionStore()
            await questionStore.index(this.actualPage)
            this.isShowDemographic = false
            this.isShowIntroduction = false
        },
        async goToNextQuestion() {
            const questionStore = useQuestionStore()
            await questionStore.index(this.afterPage)
            this.actualPage = this.afterPage
            this.afterPage += 1
            await this.updatePage()

            if (this.actualPage > this.totalPages) {
                await this.goToFinish()
            }
        },
        goToDemographic() {
            this.isShowIntroduction = false
            this.isShowDemographic = true
        },
        validDemographic() {
            this.isValidDemographic = true
            return this.isValidDemographic
        },
        notValidDemographic() {
            this.isValidDemographic = false
            return this.isValidDemographic
        },
        async updatePage() {
            const authStore = useAuthStore()
            const authUser = authStore.getAuthUser
            const id = authUser.user_instruments[0].id
            const payload = { page: this.actualPage }
            return await put('user-instruments', id, payload)

        },
        goToFinish() {
            this.isShowDemographic = false
            this.isShowIntroduction = false
            this.isFinished = true
        }
    },

    getters: {
        getIsShowIntroduction: (state) => state.isShowIntroduction,
        getActualPage: (state) => state.actualPage,
        getAfterPage: (state) => state.afterPage,
        getBeforePage: (state) => state.beforePage,
        getTotalPage: (state) => state.totalPages,
        getProgressPercentage: (state) => {
            return Math.round((parseInt(state.actualPage) / parseInt(state.totalPages)) * 100)
        },
        getIsFinished: (state) => state.isFinished,
        getIsShowDemographic: (state) => state.isShowDemographic,
        getIsValidDemographic: (state) => state.isValidDemographic,
    },

    persist: false,
})