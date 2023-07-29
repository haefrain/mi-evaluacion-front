<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="4" xxl="4">
        <v-card prepend-icon="mdi mdi-account">
          <v-card-text>
            <h3>Total Participantes</h3><h4>{{statistics.data?.totalParticipants}}</h4>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="4" xxl="4">
        <v-card prepend-icon="mdi mdi-account-check">
          <v-card-text>
            <h3>Total participantes finalizados</h3><h4> {{statistics.data?.totalParticipantsFinished}}</h4>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="4" xxl="4">
        <v-card prepend-icon="mdi mdi-account-alert">
          <v-card-text>
            <h3>Total participantes sin finalizar</h3><h4> {{statistics.data?.totalParticipantsBegined}}</h4>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="4" xxl="4">
        <v-card prepend-icon="mdi mdi-account-remove">
          <v-card-text>
            <h3>Total participantes sin iniciar</h3><h4> {{statistics.data?.totalParticipantsNotBegined}}</h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="exportParticipants">Descargar participantes</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useDashboardStore } from "~/stores/DashboardStore"

const dashboardStore = useDashboardStore()

dashboardStore.index()
const exportParticipants = async () => {
  const result = await dashboardStore.exportParticipants()
  window.open(result.data.data, "_blank");
}

const statistics = computed(() => dashboardStore.getStatistic)


</script>