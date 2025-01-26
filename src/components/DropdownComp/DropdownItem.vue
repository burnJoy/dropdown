<template>
  <button
    :disabled="item.disabled"
    class="py-1.5 px-4 w-full text-left flex text-xs"
    :class="{ 'cursor-pointer hover:bg-gray-300': !item.disabled }"
  >
    <span class="px-2 rounded-xs uppercase h-5 flex items-center" :class="item.style">
      {{ item.label }}
    </span>
  </button>
</template>

<script setup lang="ts">
export type Item = {
  id: string;
  label: string;
  style?: string;
  disabled?: boolean;
};
defineProps<{ item: Item }>();
</script>
