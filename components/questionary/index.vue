<template>
  <v-card>
    <v-card-title><h3>Evaluación de Clima, Cultura y Cambio.</h3></v-card-title>
    <v-card-text>
      <QuestionaryIntroduction v-if="isShowIntroduction"></QuestionaryIntroduction>
      <QuestionaryDemographic v-if="isShowDemographic && !isFinished && !isShowIntroduction"></QuestionaryDemographic>
      <QuestionaryQuestion v-if="!isShowDemographic && !isFinished && !isShowIntroduction"></QuestionaryQuestion>
      <QuestionaryFinished v-if="isFinished && !isShowIntroduction"></QuestionaryFinished>
    </v-card-text>
    <v-card-actions v-if="!isShowIntroduction && isShowDemographic">
      <v-spacer></v-spacer>
      <v-btn :disabled="!isValidForm" color="blue" @click="nextToQuestions()" variant="outlined">Continuar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useEvaluationStore } from '@/stores/EvaluationStore'
import { useQuestionStore } from "~/stores/QuestionStore"

const evaluationStore = useEvaluationStore()
const questionStore = useQuestionStore()

const isValidForm = computed( () => evaluationStore.getIsValidDemographic)
const isShowDemographic = computed( () => evaluationStore.getIsShowDemographic)
const isFinished = computed( () => evaluationStore.getIsFinished)
const isShowIntroduction = computed( () => evaluationStore.getIsShowIntroduction)

const nextToQuestions = async () => {
  if (isValidForm) {
    if (isShowDemographic.value && !isFinished.value) {
      await questionStore.index()
      await evaluationStore.goToQuestions()
    }
  }

}
</script>