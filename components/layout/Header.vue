<template>
  <div>
    HEADER
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/AuthStore'
const authStore = useAuthStore()
const valor = computed(() => authStore.getToken)
//const { data } = await useAsyncData('AuthStore', () => authStore.counter)
const counter = ref(valor)
</script>