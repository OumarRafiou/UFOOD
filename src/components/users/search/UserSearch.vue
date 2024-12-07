<template>
  <v-container>
    <v-text-field
      type="text"
      placeholder="Users's name"
      v-model="searchValue"
    />

    <v-btn @click="filter(searchValue)"> search! </v-btn>
    <v-btn class="m-2" @click="clear"> clear! </v-btn>
    <ResultOfUserSearch
      v-if="searchMode"
      :listeOfAllUsers="filteredList"
    ></ResultOfUserSearch>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { searchUser } from "../../../composables/useUser";
import ResultOfUserSearch from "./ResultOfUserSearch.vue";
const searchValue = ref(null);
const filteredList = ref(null);
const searchMode = ref(false);

function clear() {
  searchValue.value = "";
  searchMode.value = false;
}

async function filter(input) {
  if (input) {
    searchMode.value = true;
    filteredList.value = (await searchUser(input)).items;
  }
}
</script>
