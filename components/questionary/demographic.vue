<template>
  <div>
    <v-form v-model="valid">
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="first_name"
              :rules="nameRules"
              :counter="50"
              label="Nombre(s)"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="last_name"
              :rules="nameRules"
              :counter="50"
              label="Apellidos(s)"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="type_document"
              :rules="nameRules"
              label="Tipo de documento"
              required
              :items="['Cedula de Ciudadania']"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="document_number"
              :rules="nameRules"
              label="Numero de documento"
              required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="corporative_group_id"
              :rules="nameRules"
              label="Grupo"
              required
              item-value="id"
              item-title="name"
              :items="corporativeGroups"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="dependency_id"
              :rules="nameRules"
              label="Dependencia"
              required
              item-value="id"
              item-title="name"
              :items="dependencies"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="position_id"
              :rules="nameRules"
              label="Cargo"
              required
              item-value="id"
              item-title="title"
              :items="positions"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="type_appointment_id"
              :rules="nameRules"
              label="Tipo de Nombramiento"
              required
              item-value="id"
              item-title="name"
              :items="typeAppointments"
          ></v-select>
        </v-col>
      </v-row>


      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="gender"
              :rules="nameRules"
              label="Genero"
              required
              item-value="id"
              item-title="title"
              :items="positions"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="age"
              :rules="nameRules"
              label="Edad"
              required
              item-value="id"
              item-title="name"
              :items="typeAppointments"
          ></v-select>
        </v-col>
      </v-row>


      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="seniority"
              :rules="nameRules"
              label="Antiguedad"
              required
              item-value="id"
              item-title="title"
              :items="positions"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="educational_level"
              :rules="nameRules"
              label="Escolaridad"
              required
              item-value="id"
              item-title="name"
              :items="typeAppointments"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-switch label="¿Tiene personas a cargo?" inset color="info"></v-switch>
        </v-col>
      </v-row>

    </v-form>
  </div>
</template>
<script setup>
import {useAuthStore} from "~/stores/AuthStore";
import { useCorporativeGroupStore } from "~/stores/CorporativeGroupStore"
import { useDependencyStore } from "~/stores/DependencyStore"
import { usePositionStore } from "~/stores/PositionStore"
import { useTypeAppointmentStore } from "~/stores/TypeAppointmentStore"

const authStore = useAuthStore()
const corporativeGroupStore = useCorporativeGroupStore()
const dependencyStore = useDependencyStore()
const positionStore = usePositionStore()
const typeAppointmentStore = useTypeAppointmentStore()

const authComputed = computed(() => authStore.getAuthUser)
const corporativeGroupComputed = computed(() => corporativeGroupStore.getCorporativeGroups)
const dependencyComputed = computed(() => dependencyStore.getDependencies)
const positionComputed = computed(() => positionStore.getPositions)
const typeAppointmentComputed = computed(() => typeAppointmentStore.getTypeAppointments)

const auth = ref(authComputed)
const corporativeGroups = ref(corporativeGroupComputed)
const dependencies = ref(dependencyComputed)
const positions = ref(positionComputed)
const typeAppointments = ref(typeAppointmentComputed)
</script>
<script>
import { useAuthStore } from "~/stores/AuthStore"

export default {
  setup() {
    return {
      authStore,
    }
  },
  data: () => ({
    valid: true,
    first_name: null,
    last_name: null,
    type_document: null,
    document_number: null,
    corporative_group_id: null,
    dependency_id: null,
    position_id: null,
    type_appointment_id: null
  }),

  methods: {

  }
}
</script>