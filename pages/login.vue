<template>
  <v-row>
    <v-col>
      <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="448"
          rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Numero de documento</div>

        <v-text-field
            density="compact"
            placeholder="Numero de documento"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            :rules="[required]"
            v-model="document_number"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Contraseña
          <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
          >
            ¿Perdiste tu contraseña?</a>
        </div>

        <v-text-field
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Ingresa tu contraseña"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :rules="[required]"
            @click:append-inner="visible = !visible"
            v-model="password"
        ></v-text-field>

        <v-btn
            block
            class="mb-8"
            color="blue"
            size="large"
            variant="tonal"
            @click="login()"
        >
          Iniciar Sesión
        </v-btn>
      </v-card>
    </v-col>
  </v-row>


</template>

<script>
import { useAuthStore } from '@/stores/AuthStore'

definePageMeta({
  layout: "login",
});

export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data: () => ({
    document_number: null,
    password: null,
    loading: null,
    visible: false,
  }),

  methods: {
    onSubmit() {
      if (!this.form) return

      this.loading = true

      // Here request
    },
    required(data) {
      return !!data || 'El campo es requerido'
    },
    async login () {
      const result = await this.authStore.login_api({document_number: this.document_number, password: this.password})
      if (result.success) {
        navigateTo('/')
      }
    }
  },

}
</script>

