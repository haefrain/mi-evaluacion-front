<template>
  <div>
    preguntas
    <v-form v-model="valid">
      <v-row v-for="question in questions">
        <v-col>
          {{question.title}}
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script setup>
import { useQuestionStore } from "~/stores/QuestionStore";
const questionStore = useQuestionStore();
const questionComputed = computed(() => questionStore.getQuestions);
const questions = ref(questionComputed);
</script>