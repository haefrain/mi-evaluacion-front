import { defineStore } from "pinia";
import { post } from '~/utils/requests'
import { useUserStore } from "~/stores/UserStore";
import { useCompanyStore } from "~/stores/CompanyStore";
import { useCorporativeGroupStore } from "~/stores/CorporativeGroupStore";
import { useDependencyStore } from "~/stores/DependencyStore";
import { usePositionStore } from "~/stores/PositionStore";
import { useTypeAppointmentStore } from "~/stores/TypeAppointmentStore";
import { useEvaluationStore } from "~/stores/EvaluationStore"
import { getActivePinia } from "pinia"

const isLoggedIn = false
const token = null
const authUser = null
const csrfToken = null
export const useAuthStore = defineStore("AuthStore", {
    state: () => {
        return {
            isLoggedIn,
            token,
            authUser,
            csrfToken
        }
    },

    actions: {
        async login_api({document_number, password}) {
            const companyStore = useCompanyStore()
            const corporativeGroupStore = useCorporativeGroupStore()
            const dependencyStore = useDependencyStore()
            const positionStore = usePositionStore()
            const typeAppointmentStore = useTypeAppointmentStore()
            const evaluationStore = useEvaluationStore()
            const result = await post('login', {'document_number': document_number, 'password': password}, false)
            if (result.success) {
                this.token = result.data.data.token
                this.isLoggedIn = true
                this.authUser = result.data.data.user
                const {
                    company,
                    positions,
                    dependencies,
                    typeAppointments,
                    corporativeGroups,
                    quantityQuestions
                } = result.data.data.data_list

                companyStore.$state.company = company
                corporativeGroupStore.$state.corporativeGroups = corporativeGroups
                dependencyStore.$state.dependencies = dependencies
                positionStore.$state.positions = positions
                typeAppointmentStore.$state.typeAppointments = typeAppointments

                const userInstrument = this.authUser.user_instruments[0]
                evaluationStore.$state.isShowIntroduction = true
                evaluationStore.$state.actualPage = userInstrument.page
                evaluationStore.$state.afterPage = userInstrument.page + 1
                evaluationStore.$state.isShowDemographic = userInstrument.page === 0
                evaluationStore.$state.totalPages = quantityQuestions
                evaluationStore.$state.isFinished = userInstrument.page > quantityQuestions

            }
            return result
        },
        async logout_api() {
            const userStore = useUserStore()
            const result = await forcePost('logout')

            this.token = null
            this.isLoggedIn = false
            userStore.$state.user = null
            this.csrfToken = null

            getActivePinia()._s.forEach(store => store.$reset());

            return result
        }
    },

    getters: {
        getIsLoggedIn: (state) => state.isLoggedIn,
        getToken: (state) => state.token,
        getAuthUser: (state) => state.authUser,
        getCsrfToken: (state) => state.csrfToken,
    },

    persist: true,
})