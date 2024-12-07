<template>
  <v-container class="justify-center text-center">
    <v-card elevation="0">
      <v-card-title>Filters</v-card-title>
      <v-card-item>
        <v-btn @click="toggleExpand" class="m-2">
          <v-img
            v-if="!expanded"
            src="https://cdn-icons-png.flaticon.com/512/4655/4655143.png"
            alt=""
            class="w-6"
          />
          <v-img
            v-if="expanded"
            src="https://cdn-icons-png.flaticon.com/512/57/57055.png"
            alt=""
            class="w-6"
          />
        </v-btn>
      </v-card-item>
      <v-card-item v-show="expanded">
        <v-autocomplete
          v-model="searchValue"
          :items="getAllRestaurantNames(restaurants)"
          label="Restaurant's name"
          placeholder="Search for a restaurant"
        ></v-autocomplete>
        <v-select
          label="Chosen genre"
          v-model="genreValue"
          :items="getAllGenres(restaurants)"
          class="text-black"
          variant="solo"
        ></v-select>
      </v-card-item>
      <v-card-item v-show="expanded">
        Choose max price
        <v-slider
          v-model="priceValue"
          :min="0"
          :max="getMaxPrice(restaurants)"
          :step="1"
          tick-size="5"
          thumb-label
          elevation="0"
          track-fill-color="yellow"
          class="pt-10 px-4"
        >
          ></v-slider
        >
      </v-card-item>
      <v-card-item v-show="expanded">
        <v-btn
          @click="emit('filtering', filter(restaurants))"
          class="bg-amber-accent-1 m-2"
        >
          search!
        </v-btn>
        <v-btn @click="clearSelection" class="m-2"> clear! </v-btn>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, reactive } from "vue";
const expanded = ref(false);

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const props = defineProps({
  restaurants: Object,
});

const emit = defineEmits(["filtering"]);
const clearSelection = () => {
  priceValue.value = 0;
  genreValue.value = "any";
  searchValue.value = "";
  emit("filtering", filter(props.restaurants));
};

let priceValue = ref(0);
let genreValue = ref("any");
let searchValue = ref("");

const getAllGenres = function (restaurants) {
  let genres = [];
  genres.push("any");
  restaurants.forEach((restaurant) => {
    restaurant.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });
  return genres;
};

const getMaxPrice = function (restaurants) {
  let maxPrice = 0;
  restaurants.forEach((restaurant) => {
    if (restaurant.price_range > maxPrice) {
      maxPrice = restaurant.price_range;
    }
  });
  return maxPrice;
};
const getAllRestaurantNames = function (restaurants) {
  let restaurantNames = [];
  restaurants.forEach((restaurant) => {
    restaurantNames.push(restaurant.name);
  });
  return restaurantNames;
};

const filter = function (restaurants) {
  let filtered = restaurants;
  if (searchValue.value) {
    filtered = filtered.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchValue.value.toLowerCase())
    );
  }
  if (genreValue.value !== "any") {
    filtered = filtered.filter((restaurant) =>
      restaurant.genres.includes(genreValue.value)
    );
  }
  if (priceValue.value !== 0) {
    filtered = filtered.filter(
      (restaurant) => restaurant.price_range <= priceValue.value
    );
  }
  emit("filtering", filtered);
  return filtered;
};
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

input {
  background: white;
  font-family: "Helvetica Neue", Arial, sans-serif;
  border: 3px solid #000;
}

@media (max-width: 800px) {
  .v-card-item {
    font-size: 15px;
  }

  .v-card-title {
    font-size: 18px;
    font-weight: bold;
  }

  .v-btn {
    font-size: 15px;
  }
}
</style>
