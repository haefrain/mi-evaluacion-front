import { defineStore } from "pinia";
import { post } from '../utils/requests'
import { useUserStore } from "~/stores/UserStore";
import { useCompanyStore } from "~/stores/CompanyStore";
import { useCorporativeGroupStore } from "~/stores/CorporativeGroupStore";
import { useDependencyStore } from "~/stores/DependencyStore";
import { useInstrumentStore } from "~/stores/InstrumentStore";
import { usePositionStore } from "~/stores/PositionStore";
import { useQuestionStore } from "~/stores/QuestionStore";
import { useTypeAppointmentStore } from "~/stores/TypeAppointmentStore";

const isLoggedIn = false
const token = null
const authUser = null
export const useAuthStore = defineStore("AuthStore", {
    state: () => {
        return {
            isLoggedIn,
            token,
            authUser
        }
    },

    actions: {
        async login_api({document_number, password}) {
            const companyStore = useCompanyStore()
            const corporativeGroupStore = useCorporativeGroupStore()
            const dependencyStore = useDependencyStore()
            const positionStore = usePositionStore()
            const questionStore = useQuestionStore()
            const typeAppointmentStore = useTypeAppointmentStore()
            const result = await post('login', {'document_number': document_number, 'password': password}, false)
            if (result.success) {
                this.token = result.data.data.token
                this.isLoggedIn = true
                this.authUser = result.data.data.user
                const {
                    questions,
                    company,
                    positions,
                    dependencies,
                    typeAppointments,
                    corporativeGroups,
                } = result.data.data.data_list

                companyStore.$state.company = company
                corporativeGroupStore.$state.corporativeGroups = corporativeGroups
                dependencyStore.$state.dependencies = dependencies
                positionStore.$state.positions = positions
                questionStore.$state.questions = questions
                typeAppointmentStore.$state.typeAppointments = typeAppointments
            }

            return result
        },
        async logout_api() {
            const userStore = useUserStore()
            const result = await post('logout')
            if (result.success) {
                this.token = null
                this.isLoggedIn = false
                userStore.$state.user = null
            }

            return result
        }
    },

    getters: {
        getIsLoggedIn: (state) => state.isLoggedIn,
        getToken: (state) => state.token,
        getAuthUser: (state) => state.authUser,
    },

    persist: true,
})