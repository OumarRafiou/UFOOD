<script setup>
import OpeningTime from "@/components/restaurant/OpeningTime.vue";
import RestaurantInformations from "@/components/restaurant/RestaurantInformations.vue";
import RestaurantImages from "@/components/restaurant/RestaurantImages.vue";
import GoogleMap from "@/components/restaurant/GoogleMap.vue";
import { getRestaurant } from "@/composables/UseRestaurant";
import { ref, nextTick, watchEffect } from "vue";
import { useRoute } from "vue-router";
import AddToFavorite from "@/components/restaurant/AddToFavorite.vue";
import RestaurantSuggestion from "../components/restaurant/RestaurantSuggestion.vue";
import Loading from "../components/navigation/Loading.vue";

const opening_hours = ref(null);
const pictures = ref();
const name = ref(null);
const tel = ref(null);
const address = ref(null);
const price_range = ref(null);
const rating = ref(null);
const genres = ref(null);
let isLoaded = ref(false);
const restoId = ref(null);
const route = useRoute();

const fetchData = async () => {
  if (route.params.id === undefined) {
    return;
  }
  const data = await getRestaurant(route.params.id);
  opening_hours.value = data.opening_hours;
  pictures.value = data.pictures;
  name.value = data.name;
  tel.value = data.tel;
  address.value = data.address;
  price_range.value = data.price_range;
  rating.value = data.rating;
  genres.value = data.genres;
  isLoaded.value = true;
};

watchEffect(() => {
  fetchData();
  window.scrollTo(0, 0);
});

const reload = async () => {
  isLoaded.value = !isLoaded.value;
  await nextTick();
  await fetchData();
};

fetchData();
</script>

<template>
  <v-container class="justify-center mt-2">
    <Loading :is-loading="!isLoaded"></Loading>
    <v-row>
      <v-col>
        <RestaurantInformations
          v-if="isLoaded"
          :name="name"
          :tel="tel"
          :price_range="price_range"
          :rating="rating"
          :address="address"
          :genres="genres"
        />
        <RestaurantImages v-if="isLoaded" :pictures="pictures" class="mt-10" />
        <OpeningTime
          v-if="isLoaded"
          :opening_hours="opening_hours"
          class="mt-10"
        />
        <GoogleMap v-if="isLoaded" :address="address" class="mt-10" />
        <AddToFavorite v-if="isLoaded" class="mt-10 mb-5"></AddToFavorite>
        <RestaurantSuggestion
          :genres="genres"
          :name="name"
          v-if="isLoaded"
          class="mt-10 mb-5"
          @reload="reload()"
        ></RestaurantSuggestion>
      </v-col>
    </v-row>
  </v-container>
</template>
