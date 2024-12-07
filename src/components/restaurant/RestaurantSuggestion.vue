<script setup>
import { ref } from "vue";
import { getRestaurantByGenres } from "@/composables/UseRestaurant.js";
import { router } from "@/router";
const props = defineProps({
  genres: Array, //ok
  name: String,
});
const emit = defineEmits(["reload"]);
const suggestions = ref([]);
const findSuggestions = async () => {
  //let suggestions = [];
  const resp = await getRestaurantByGenres(props.genres);
  for (let item of resp.items) {
    if (item.name != props.name) {
      suggestions.value.push(item);
    }
  }
  //return suggestions;
};
findSuggestions();

const goToRestaurant = (id) => {
  router.push({
    name: "Restaurant",
    params: { id: id },
  });
  emit("reload");
};
</script>

<template>
  <v-container>
    <div class="favorite-icon">
      <i class="far fa-heart"></i>
    </div>
    <v-card title="Suggestions" class="text-sm" elevation="0">
      <v-card-item v-for="sug in suggestions" :key="sug">
        {{ sug.name }}
        <v-btn class="mx-2" @click="goToRestaurant(sug.id)"> Go to page</v-btn>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  background: white;
  font-family: "Helvetica Neue", Arial, sans-serif;
  padding: 20px;
  border: 3px solid #000;
  box-shadow: 10px 15px 0 black;
}
.v-btn {
  background: white;
  font-family: "Helvetica Neue", Arial, sans-serif;
  border: 3px solid #000;
  box-shadow: 5px 10px 0 black;
}

@media (max-width: 800px) {
  .v-card-item {
    font-size: 15px;
  }

  .v-card-title {
    font-size: 18px;
    font-weight: bold;
  }
}

input {
  background: white;
  font-family: "Helvetica Neue", Arial, sans-serif;
  border: 3px solid #000;
}
</style>
