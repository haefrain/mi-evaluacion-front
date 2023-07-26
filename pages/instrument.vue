<template>
  <v-container>
    <v-row>
      <v-col>
        <v-table>
          <thead>
          <tr>
            <th class="text-left">
              Instrumento
            </th>
            <th class="text-left">
              Ir al instrumento
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="instrument in instruments"
              :key="instrument.id"
          >
            <td>{{ instrument.title }}</td>
            <td>{{ instrument.calories }}</td>
          </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
</script>