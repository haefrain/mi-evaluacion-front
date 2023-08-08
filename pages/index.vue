<template>
  <v-container>
    
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