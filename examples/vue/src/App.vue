<script setup>
import { ref } from 'vue'

const value = ref(null)
</script>

<template>
  <div>
    value: {{ value }}
  </div>

  <div>
    <input-dt v-model="value">
      <input type="text" input-dt></input>
    </input-dt>
  </div>
</template>
