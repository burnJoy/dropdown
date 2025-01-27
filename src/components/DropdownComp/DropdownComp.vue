<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import DropdownItem, { type Item } from './DropdownItem.vue';
import useOutsideClick from '../../composables/outsideClick';

const isOpen = ref(false);
const selected = defineModel<Item | null>();

const props = withDefaults(
  defineProps<{
    label?: string;
    list: Item[];
    disabled?: boolean;
  }>(),
  {
    label: 'select tag',
  }
);

const onSelect = (item: Item) => {
  isOpen.value = false;

  if (selected.value?.id === item.id) {
    selected.value = null;
  } else {
    selected.value = item;
  }
};

const toggleOpen = () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    activeIndex.value = -1;
  }
};

// navigation with keyboard
const focusNextItem = () => {
  activeIndex.value = (activeIndex.value + 1) % items.value.length;
  items.value[activeIndex.value]?.querySelector('button')?.focus();
};

const focusPreviousItem = () => {
  activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length;
  items.value[activeIndex.value]?.querySelector('button')?.focus();
};

const keyActions: Record<string, (event: KeyboardEvent) => void> = {
  ArrowDown: focusNextItem,
  ArrowUp: focusPreviousItem,
  Enter: () => activeIndex.value >= 0 && onSelect(props.list[activeIndex.value]),
  Escape: () => (isOpen.value = false),
  Tab: (event) => {
    if (event.shiftKey) {
      focusPreviousItem();
    } else {
      focusNextItem();
    }
  },
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (!isOpen.value) return;
  const action = keyActions[event.key];
  if (action) {
    event.preventDefault();
    action(event);
  }
};

watch(isOpen, () => {
  if (isOpen.value) {
    window.addEventListener('keydown', handleKeyDown);
  } else {
    window.removeEventListener('keydown', handleKeyDown);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

// outside click
const dropdown = ref<HTMLElement | null>(null);
let removeOutsideClick: () => void;
watch(isOpen, () => {
  if (isOpen.value) {
    removeOutsideClick = useOutsideClick(dropdown, () => {
      isOpen.value = false;
    });
  } else {
    removeOutsideClick?.();
  }
});

const items = ref<HTMLElement[]>([]);
const activeIndex = ref(-1);
</script>

<template>
  <div ref="dropdown" class="dropdown-comp relative font-medium z-10" :class="{ 'opacity-60': disabled }">
    <button @click="toggleOpen" class="flex items-center" :class="{ 'cursor-pointer': !disabled }" :disabled="disabled">
      <span
        class="px-2 rounded-xs uppercase h-8 flex items-center text-sm font-semibold pr-3"
        :class="[
          selected?.style,
          { 'bg-white': !selected?.style },
          !selected ? ['border-1', 'border-gray-300', 'text-gray-600'] : '',
        ]"
      >
        {{ selected?.label || label }}
        <span
          class="border-t-2 border-r-2 w-2 h-2 border-gray-700 ml-2 ease-in-out transition-all"
          :class="{ 'rotate-135': !isOpen, '-rotate-45 mt-2': isOpen }"
        ></span>
      </span>
    </button>

    <Transition>
      <div
        v-if="isOpen"
        class="border-1 border-gray-200 absolute top-full translate-y-1 rounded-xs py-1 shadow-xl shadow-gray-200 bg-white"
      >
        <ul class="flex flex-col text-3 font-medium">
          <template v-if="list.length">
            <li v-for="(item, index) in list" ref="items">
              <DropdownItem
                @click="onSelect(item)"
                :key="item.id"
                :item="item"
                @focus="activeIndex = index"
                class="focus:outline-2 outline-blue-500"
                :class="[{ 'bg-gray-300': selected?.id === item.id }]"
              />
            </li>
          </template>
          <template v-else>
            <li>
              <DropdownItem :item="{ id: '', label: 'list is empty', disabled: true }" />
            </li>
          </template>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
