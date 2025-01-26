<template>
  <button class="py-1.5 px-4 hover:bg-gray-300 cursor-pointer w-full text-left flex text-xs">
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
};
defineProps<{ item: Item }>();
</script>
