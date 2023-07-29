<template>
  <div>
    <v-row>
      <v-col align="center">
        <h2>¡Felicidades!</h2>
        <h3>Has finalizado con éxito la evaluación de clima, cultura y cambio.</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center">
        <v-btn color="info" @click="finish">Salir</v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { useAuthStore } from '~/stores/AuthStore'
const authStore = useAuthStore()
const finish = async () => {
  await authStore.logout_api()
  navigateTo('/login')
}
</script>