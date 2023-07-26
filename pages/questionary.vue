<template>
  <v-container>
    <v-row>
      <v-col>
        <Questionary></Questionary>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {useInstrumentStore} from '~/stores/InstrumentStore'

export default {
  setup() {
    const instrumentStore = useInstrumentStore()
    return { instrumentStore }
  },
  methods: {

  }
}
</script>