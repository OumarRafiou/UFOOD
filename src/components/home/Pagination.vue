<template>
  <div class="pagination" v-if="numPages > 1">
    <v-pagination
      :model-value="currentPageCopy"
      :length="numPages"
      @update:model-value="changePage"
      rounded="circle"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const itemsPerPage = 10;

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  onUpdateCurrentPage: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(["update:currentPage"]);

const currentPageCopy = computed({
  get: () => props.currentPage,
  set: (value) => {
    props.onUpdateCurrentPage(value);
    emit("update:currentPage", value);
  },
});

const displayedItems = computed(() => {
  const start = (currentPageCopy.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.items.slice(start, end);
});

const numPages = computed(() => {
  return Math.ceil(props.items.length / itemsPerPage);
});

const changePage = (page) => {
  props.onUpdateCurrentPage(page);
  emit("update:currentPage", page);
};

const nextPage = () => {
  if (currentPageCopy.value < numPages.value) {
    currentPageCopy.value = currentPageCopy.value + 1;
    emit("update:currentPage", currentPageCopy.value);
  }
};

const previousPage = () => {
  if (currentPageCopy.value > 1) {
    currentPageCopy.value = currentPageCopy.value - 1;
    emit("update:currentPage", currentPageCopy.value);
  }
};
</script>

<style></style>
