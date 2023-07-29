<template>
  <div>
    <v-row>
      <v-col>
        <h2>Información personal</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert
            v-model="isShowMessage"
            :type="typeMessage"
            :text="message"
        ></v-alert>
      </v-col>
    </v-row>
    <v-form ref="form_demographic">
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="formData.first_name"
              :counter="50"
              label="Nombre(s)"
              @change="v$.first_name.$touch"
              :error="v$.first_name.$error"
              :error-messages="v$.first_name.$errors[0]?.$message ?? ''"
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="formData.last_name"
              :counter="50"
              label="Apellidos(s)"
              @change="v$.last_name.$touch"
              :error="v$.last_name.$error"
              :error-messages="v$.last_name.$errors[0]?.$message ?? ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.type_document"
              label="Tipo de documento"
              @change="v$.type_document.$touch"
              item-value="id"
              item-title="name"
              :items="[{id: 'cc', name: 'Cedula de Ciudadania'}]"
              :error="v$.type_document.$error"
              :error-messages="v$.type_document.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field
              v-model="formData.document_number"
              label="Numero de documento"
              @change="v$.document_number.$touch"
              :error="v$.document_number.$error"
              :error-messages="v$.document_number.$errors[0]?.$message ?? ''"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.corporative_group_id"
              label="Grupo"
              @change="v$.corporative_group_id.$touch"
              item-value="id"
              item-title="name"
              :items="corporativeGroups"
              :error="v$.corporative_group_id.$error"
              :error-messages="v$.corporative_group_id.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.dependency_id"
              label="Dependencia"
              @change="v$.dependency_id.$touch"
              item-value="id"
              item-title="name"
              :items="dependencies"
              :error="v$.dependency_id.$error"
              :error-messages="v$.dependency_id.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.position_id"
              label="Cargo"
              @change="v$.position_id.$touch"
              item-value="id"
              item-title="title"
              :items="positions"
              :error="v$.position_id.$error"
              :error-messages="v$.position_id.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.type_appointment_id"
              label="Tipo de Nombramiento"
              @change="v$.type_appointment_id.$touch"
              item-value="id"
              item-title="name"
              :items="typeAppointments"
              :error="v$.type_appointment_id.$error"
              :error-messages="v$.type_appointment_id.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
      </v-row>


      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.gender"
              label="Genero"
              @change="v$.gender.$touch"
              item-value="id"
              item-title="name"
              :items="genders"
              :error="v$.gender.$error"
              :error-messages="v$.gender.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.age"
              label="Edad"
              @change="v$.age.$touch"
              item-value="id"
              item-title="name"
              :items="ages"
              :error="v$.age.$error"
              :error-messages="v$.age.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
      </v-row>


      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.seniority"
              label="Antiguedad"
              @change="v$.seniority.$touch"
              item-value="id"
              item-title="name"
              :items="seniorities"
              :error="v$.seniority.$error"
              :error-messages="v$.seniority.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-select
              v-model="formData.education_level"
              label="Escolaridad"
              @change="v$.education_level.$touch"
              item-value="id"
              item-title="name"
              :items="education_levels"
              :error="v$.education_level.$error"
              :error-messages="v$.education_level.$errors[0]?.$message ?? ''"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-switch v-model="formData.with_people_charge" label="¿Tiene personas a cargo?" inset color="info"></v-switch>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center">
          <v-btn value="Actualizar datos" color="info" @click="updateData">Actualizar datos</v-btn>
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
import { useEvaluationStore } from "~/stores/EvaluationStore"
import { usePersonStore } from "~/stores/PersonStore"
import { required, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
// Some code
const rules = computed(() => {
  return {
    first_name: { required: helpers.withMessage('El campo es requerido.', required) },
    last_name: { required: helpers.withMessage('El campo es requerido.', required) },
    type_document: { required: helpers.withMessage('El campo es requerido.', required) },
    document_number: { required: helpers.withMessage('El campo es requerido.', required) },
    corporative_group_id: { required: helpers.withMessage('El campo es requerido.', required) },
    dependency_id: { required: helpers.withMessage('El campo es requerido.', required) },
    position_id: { required: helpers.withMessage('El campo es requerido.', required) },
    type_appointment_id: { required: helpers.withMessage('El campo es requerido.', required) },
    gender: { required: helpers.withMessage('El campo es requerido.', required) },
    age: { required: helpers.withMessage('El campo es requerido.', required) },
    seniority: { required: helpers.withMessage('El campo es requerido.', required) },
    education_level: { required: helpers.withMessage('El campo es requerido.', required) },
  };
});

const authStore = useAuthStore()
const corporativeGroupStore = useCorporativeGroupStore()
const dependencyStore = useDependencyStore()
const positionStore = usePositionStore()
const typeAppointmentStore = useTypeAppointmentStore()
const evaluationStore = useEvaluationStore()
const personStore = usePersonStore()

const authenticateUser = authStore.getAuthUser
const corporativeGroupComputed = computed(() => corporativeGroupStore.getCorporativeGroups)
const dependencyComputed = computed(() => dependencyStore.getDependencies)
const positionComputed = computed(() => positionStore.getPositions)
const typeAppointmentComputed = computed(() => typeAppointmentStore.getTypeAppointments)
const corporativeGroups = ref(corporativeGroupComputed)
const dependencies = ref(dependencyComputed)
const positions = ref(positionComputed)
const typeAppointments = ref(typeAppointmentComputed)

const isValidForm = computed( () => evaluationStore.getIsValidDemographic)
const validDemographic = evaluationStore.validDemographic()

let valid = ref(isValidForm ?? false)

const formData = reactive({
  id: authenticateUser.person?.id ?? null,
  first_name: authenticateUser.person?.first_name ?? null,
  last_name: authenticateUser.person?.last_name ?? null,
  type_document: authenticateUser.type_document ?? null,
  document_number: authenticateUser.document_number ?? null,
  corporative_group_id: authenticateUser.person?.corporative_group_id ?? null,
  dependency_id: authenticateUser.person?.dependency_id ?? null,
  position_id: authenticateUser.person?.position_id ?? null,
  type_appointment_id: authenticateUser.person?.type_appointment_id ?? null,
  gender: authenticateUser.person?.gender ?? null,
  age: authenticateUser.person?.age ?? null,
  seniority: authenticateUser.person?.seniority ?? null,
  education_level: authenticateUser.person?.education_level ?? null,
  with_people_charge: authenticateUser.person?.with_people_charge ?? null,
})

const v$ = useVuelidate(rules, formData);
const isShowMessage = ref(false)
const typeMessage = ref(null)
const message = ref(null)

const genders = ref([
  {id: 'male', name: 'Hombre'},
  {id: 'female', name: 'Mujer'},
  {id: 'ns/nr', name: 'No sabe / No responde'},
])

const ages = ref([
  {id: '0-25', name: 'Menor de 25 años'},
  {id: '26-35', name: 'Entre 26 y 35 años'},
  {id: '36-45', name: 'Entre 36 y 45 años'},
  {id: '46-55', name: 'Entre 46 y 55 años'},
  {id: '56-999', name: 'Mas de 56 años'},
])

const seniorities = ref([
  {id: '0-2', name: 'Menor de 2 años'},
  {id: '3-5', name: 'Entre 3 y 5 años'},
  {id: '6-10', name: 'Entre 6 y 10 años'},
  {id: '11-15', name: 'Entre 11 y 15 años'},
  {id: '15-999', name: 'Mas de 15 años'},
])

const education_levels = ref([
  {id: 'NoBachiller', name: 'No Bachiller'},
  {id: 'Bachiller', name: 'Bachiller'},
  {id: 'Tecnico', name: 'Tecnico'},
  {id: 'Universitario', name: 'Universitario'},
  {id: 'Profesional', name: 'Profesional'},
  {id: 'Post-grado', name: 'Post-grado'},
])
if (formData.age === null && formData.seniority === null && formData.education_level === null) {
  evaluationStore.notValidDemographic()
} else {
  evaluationStore.validDemographic()
}

const updateData = async () => {
  v$.value.$validate();
  if (v$.value.$error) return

  const result = await personStore.update(formData)
  typeMessage.value = result.success ? 'success' : 'error'
  message.value = result.success ? 'El registro se ha actualizado correctamente' : result.data
  isShowMessage.value = true
  evaluationStore.validDemographic()
}

</script>