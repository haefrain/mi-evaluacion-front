<template>
  <div>
    <v-row class="h-25" justify="center" align="center">
      <v-col align="center">
        <v-img
            :width="300"
            src="./logo_agn.png"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span>
          Bienvenid@ a la aplicación de la Encuesta de Clima, Cultura y Cambio AGN 2021, lo invitamos a darnos su opinión frente a diferentes aspectos en la entidad.
          <br />
          <br />
          Recuerde que sus respuestas serán anónimas y que no existen respuestas correctas o incorrectas, por lo que conteste de forma rápida y sincera, sin dejarse influenciar por la opinión de otros.
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn color="info" @click="nextToPage">Iniciar</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { useEvaluationStore } from '@/stores/EvaluationStore'
const evaluationStore = useEvaluationStore()
const actualPage = computed(() => evaluationStore.getActualPage)
const progressPercentage = computed(() => evaluationStore.getProgressPercentage)
const isShowDemographic = computed(() => evaluationStore.getIsShowDemographic)
const nextToPage = () => {
  if (isShowDemographic.value) {
    evaluationStore.goToDemographic()
  }

  if (actualPage.value > 0) {
    evaluationStore.goToQuestions()
  }

  if (progressPercentage >= 100) {
    evaluationStore.goToFinish()
  }
}
</script>