<template>
  <div>
    <Loading :is-loading="!isloaded" />
    <div v-if="isloaded">
      <FilterRestaurants
        @filtering="restaurantsFiltered"
        v-if="isloaded"
        :restaurants="json"
        class="mt-10"
      />
      <div style="display: flex; justify-content: center; align-items: center">
        <v-btn
          class="v-btn v-btn--elevated v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-elevated bg-white-accent-1 m-10"
          @click="toggleMap"
        >
          <span class="v-btn__overlay"></span>
          <span class="v-btn__underlay"></span>
          <span class="v-btn__content">Toggle Map</span>
        </v-btn>
      </div>
      <HomeGoogleMap :restaurants="resoFiltered" v-if="showMap" />
      <Restaurants
        :restaurants="displayedRestaurants"
        :VisitedRestaurant="visitedRestoFormate"
        v-if="!showMap"
      />
      <Pagination
        v-if="!showMap"
        :items="resoFiltered"
        :num-pages="numPages"
        :current-page="currentPage"
        :on-update-current-page="(page) => (currentPage = page)"
        @update:currentPage="changePage"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import Restaurants from "@/components/home/Restaurants.vue";
import Loading from "../components/navigation/Loading.vue";
import {
  getRestaurant,
  getRestaurants,
  getVisitedRestaurentsByUser,
} from "@/composables/UseRestaurant";
import { ref, computed, watch, toRaw, nextTick } from "vue";
import FilterRestaurants from "@/components/home/FilterRestaurants.vue";
import Pagination from "@/components/home/Pagination.vue";
import HomeGoogleMap from "../components/home/HomeGoogleMap.vue";

const showMap = ref(false);
const json = ref(null);
const isloaded = ref(false);
const resoFiltered = ref(null);
const itemsPerPage = 10;
const currentPage = ref(1);
const numPages = ref(1);
let idsOfVisitedResto = ref(null);
let visitedRestoFormate = ref(null);
const locations = ref([]);

const fetchData = async () => {
  const data = await getRestaurants();
  json.value = data.items;
  for (let i = 0; i < json.value.length; i++) {
    const restaurant = json.value[i];
    const names = restaurant.name;
    const addresses = restaurant.address;
    const coordinates = restaurant.location.coordinates;
    const photos = restaurant.pictures;
    locations.value.push([coordinates, names, addresses, photos]);
  }

  isloaded.value = true;
  resoFiltered.value = json.value;
  numPages.value = Math.ceil(json.value.length / itemsPerPage);
  const info = await getVisitedRestaurentsByUser();
  idsOfVisitedResto.value = info.items;
  visitedRestoFormate.value = await formatRestaurents(idsOfVisitedResto.value);
  checkVisitedResto(resoFiltered.value);
};
const emits = defineEmits(["update:currentPage"]);
const restaurantsFiltered = async (filteredRestaurants) => {
  resoFiltered.value = filteredRestaurants;
  currentPage.value = 1;
  if (showMap.value) {
    showMap.value = !showMap.value;
    await nextTick();
    showMap.value = !showMap.value;
  }
};

const toggleMap = () => {
  showMap.value = !showMap.value;
};

watch(resoFiltered, () => {
  currentPage.value = 1;
});
const displayedRestaurants = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return resoFiltered.value.slice(start, end);
});
const changePage = (page) => {
  currentPage.value = page;
};
const checkVisitedResto = function (AllRestos) {
  for (const restaurant of AllRestos) {
    for (const element of visitedRestoFormate.value) {
      if (element.name === restaurant.name) {
        restaurant["visited"] = true;
      }
    }
  }
};
const nextPage = () => {
  if (currentPage.value < numPages.value) {
    currentPage.value = currentPage.value + 1;
  }
};
const formatRestaurents = async function (visitedResto) {
  const listeDeRestoFormate = [];
  for (const element of visitedResto) {
    listeDeRestoFormate.push(await getRestaurant(element["restaurant_id"]));
  }
  return listeDeRestoFormate;
};
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  }
};
fetchData();
</script>

<style></style>
