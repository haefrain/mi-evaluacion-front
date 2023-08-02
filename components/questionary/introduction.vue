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
          Debemos colocar Bienvend@ a la aplicación de la Encuesta de Clima, Cultura y Cambio AGN 2023, te invitamos a darnos tu opinión frente a diferentes aspectos de la Entidad.
          <br />
          <br />
          Recuerda que tus respuestas serán anónimas y que no existen respuestas correctas o incorrectas, por lo que contesta de forma rápida y sincera, sin dejarte influenciar por la opinión de otras personas.
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