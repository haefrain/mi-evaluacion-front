<template>
  <div>
    <v-row>
      <v-col>
        <h2>Cuestionario</h2>
      </v-col>
    </v-row>
    <v-expand-transition>
      <v-row justify="center" class="h-25" v-show="isVisibleLoader">
        <v-col align="center">
          <v-progress-circular
              indeterminate
              color="info"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-expand-transition>
    <v-expand-transition>
      <div v-show="!isVisibleLoader">
        <v-row v-for="(question, index) in questions" >
          <v-col>
            <h3>{{question.title}}</h3>
            <v-form v-model="valid">
              <v-radio-group
                  v-model="questionsRes[index]"
                  :error="v$[index].$error"
                  :error-messages="v$[index].$errors[0]?.$message ?? ''"
              >
              <v-row>
                <v-col cols="12" xs="12" sm="6" md="6" lg="3" xl="3" xxl="3" v-for="option in question.options">
                  <v-radio :label="option.title" :value="option" @change="submitAnswer(option)"></v-radio>
                </v-col>
              </v-row>
              </v-radio-group>
            </v-form>
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
    <v-row>
      <v-col align="right">
        <v-btn color="info" @click="nextQuestions">Continuar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-progress-linear :model-value="progressPercentage"></v-progress-linear>
      </v-col>
    </v-row>


  </div>
</template>
<script setup>
import { useQuestionStore } from "~/stores/QuestionStore"
import { useEvaluationStore } from "~/stores/EvaluationStore"
import { useAuthStore } from "~/stores/AuthStore"
import { useAnswerStore } from "~/stores/AnswerStore"
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const questionStore = useQuestionStore()
const evaluationStore = useEvaluationStore()
const authStore = useAuthStore()
const answerStore = useAnswerStore()

const questions = computed(() => questionStore.getQuestions.data)
const progressPercentage = computed(() => evaluationStore.getProgressPercentage)
const userAuthenticated = computed(() => authStore.getAuthUser)

let questionsRes = reactive([])
const validation = questions.value.map(item => {
  return {required: helpers.withMessage('El campo es requerido.', required)}
})
const rules = computed(() => {
  return validation
})

const isVisibleLoader = ref(false)

let v$ = useVuelidate(rules, questionsRes);
const submitAnswer = async (option) => {
  const answer = {
    question_id: option.question_id,
    user_id: userAuthenticated.value.id,
    option_id: option.id,
  }
  await answerStore.store(answer)
}

const validateForm = () => {
  v$.value.$validate()
  return !v$.value.$error
}

const nextQuestions = async () => {
  if (validateForm()) {

    isVisibleLoader.value = true

    await evaluationStore.goToNextQuestion()

    isVisibleLoader.value = false

    const validation = questions.value.map(item => {
      return {required: helpers.withMessage('El campo es requerido.', required)}
    })
    const rules = computed(() => {
      return validation
    })

    questionsRes = reactive([])
    v$ = useVuelidate(rules, questionsRes);
  }
}
</script>