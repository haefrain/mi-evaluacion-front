<template>
  <v-layout>
    <v-navigation-drawer expanded>
      <v-list>
        <v-list-item>
          <v-img
              :width="300"
              src="./logo_agn.png"
          ></v-img>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item prepend-icon="mdi-home" title="Inicio" value="inicio" href="/" v-if="!isUser"></v-list-item>
        <v-list-item prepend-icon="mdi-list-box-outline" title="Mis Evaluaciones" value="misEvaluaciones" href="/questionary" v-if="isUser"></v-list-item>
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
      await this.authStore.logout_api()
      navigateTo('/login')
    }
  },
  computed: {
    isUser() {
      return this.authStore.authUser.role.name === 'User'
    }
  }
}

</script>