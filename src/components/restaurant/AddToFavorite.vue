<template>
  <v-container v-if="isLoaded">
    <v-card v-if="isLoaded" elevation="0">
      <v-card-item>
        <v-select
          label="Favorite"
          v-model="NomFavoriteList"
          :items="getFavoritesNames(ListesDeRestofavorites)"
          class="text-black"
          variant="solo"
          @change="onSelectItem"
        ></v-select>
      </v-card-item>
      <v-card-item>
        <v-layout
          :disabled="RestoAlreadyInFavorite(NomFavoriteList)"
        ></v-layout>
        <v-btn
          :disabled="isPresent"
          @click="addFavoriteToList(NomFavoriteList)"
          color="m-10"
        >
          Add
        </v-btn>
        <v-layout v-if="isPresent"> Already in the list</v-layout>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { ID } from "../../composables/API_ENDPOINT";
import {
  addToFavorites,
  getListefavori,
  getUserFavorites,
} from "@/composables/UseRestaurant";
import { ref } from "vue";
import { useRoute } from "vue-router";
import Cookies from "js.cookie";

const route = useRoute();

const ListesDeRestofavorites = ref(null);
let NomFavoriteList = ref(null);
let isLoaded = ref(false);
let isPresent = ref(false);
let isAdded = ref(false);
const restoId = route.params.id;
const fetch = async () => {
  const token = Cookies.get("connectionToken");
  if (token.id === null || token.token === null) {
    isLoaded.value = false;
  } else {
    try {
      ListesDeRestofavorites.value = (await getUserFavorites(token.id)).items;
      NomFavoriteList.value = ListesDeRestofavorites.value[0].name;
      isLoaded.value = true;
    } catch (e) {}
  }
};
const onSelectItem = () => {
  isAdded.value = false;
};
const RestoAlreadyInFavorite = async (listName) => {
  let Its = false;
  const id = getIdOfListeByName(ListesDeRestofavorites.value, listName);
  const listeDeRestoFavoris = await getListefavori(id);
  for (const element of listeDeRestoFavoris.restaurants) {
    if (element.id === restoId) {
      Its = true;
    }
  }
  isPresent.value = Its;
};

const getFavoritesNames = function (array) {
  let favList = [];
  array.forEach(function (item) {
    favList.push(item.name);
  });
  return favList;
};

const getIdOfListeByName = function (array, name) {
  let id = null;
  array.forEach(function (item) {
    if (item.name === name) {
      id = item.id;
    }
  });
  return id;
};

const addFavoriteToList = async (listName) => {
  await addToFavorites(
    getIdOfListeByName(ListesDeRestofavorites.value, listName),
    restoId
  );
  isPresent.value = true;
};

fetch();
</script>

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
