<template>
  <v-layout>
    <v-navigation-drawer expanded>
      <v-list>
        <v-list-item
            title="Mi Evaluación"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Inicio" value="inicio"></v-list-item>
        <v-list-item prepend-icon="mdi-list-box-outline" title="Mis Evaluaciones" value="misEvaluaciones" href="/questionary"></v-list-item>
        <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" value="Cerrar sesión" @click="logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 250px">
      <slot />
    </v-main>
  </v-layout>
</template>
<script>
import { useAuthStore } from '@/stores/AuthStore'

export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  methods: {
    async logout() {
      const response = await this.authStore.logout_api();
      if (response.success) {
        navigateTo('/login')
      }
    }
  }
}

</script>