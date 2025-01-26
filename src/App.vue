<script setup lang="ts">
import StatusDropdown from './components/DropdownComp/DropdownComp.vue';
import { ref } from 'vue';

const list = [
  { id: 'draft', label: 'draft', style: 'bg-white border-1' },
  { id: 'completed', label: 'completed', style: 'bg-green-100 text-green-700' },
  { id: 'failed', label: 'failed', style: 'bg-red-100 text-red-600' },
];

const status = ref<(typeof list)[0] | null>(list[0]);
</script>

<template>
  <StatusDropdown :list="list" v-model="status" />
</template>
