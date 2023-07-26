<template>
  <v-card>
    <v-card-title>Evaluación de Clima, Cultura y Cambio.</v-card-title>
    <v-card-text>
      <QuestionaryDemographic></QuestionaryDemographic>
      <QuestionaryQuestion></QuestionaryQuestion>
      <QuestionaryFinished></QuestionaryFinished>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue" @click="login()" variant="outlined">Continuar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
</script>