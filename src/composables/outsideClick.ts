import type { Ref } from 'vue';

const useOutsideClick = (el: Ref<HTMLElement | null>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (el.value && !el.value.contains(e.target as Node)) {
      callback();
    }
  };

  setTimeout(() => {
    document.addEventListener('click', handleClick);
  });

  return () => {
    document.removeEventListener('click', handleClick);
  };
};

export default useOutsideClick;
