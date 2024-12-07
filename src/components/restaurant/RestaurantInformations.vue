<script setup>
defineProps({
  name: String, //ok
  tel: String, //ok
  price_range: Number, //ok
  rating: Number, //ok
  genres: Array, //ok
  address: String, //ok
});
const formateRating = function (rating) {
  return `Rating: ${rating.toFixed(1)}/5`;
};

const formatePriceRange = function (price_range) {
  return `Price Range: ${price_range.toFixed(1)}`;
};

const formateGenres = function (genres) {
  const formattedGenres = genres.map((genre) => genre.trim()).join(", ");
  return `Genre: ${formattedGenres}`;
};

const formateTel = function (tel) {
  return `Phone number: ${tel}`;
};

const formateAddress = function (address) {
  return `Address: ${address}`;
};
</script>

<template>
  <v-container>
    <div class="favorite-icon">
      <i class="far fa-heart"></i>
    </div>
    <v-card :title="name" class="text-sm" elevation="0">
      <v-card-item>
        <div class="text-xs sm:text-base">{{ formateRating(rating) }}</div>
        <div class="text-xs sm:text-base">
          {{ formatePriceRange(price_range) }}
        </div>
        <div class="text-xs sm:text-base">{{ formateTel(tel) }}</div>
        <div class="text-xs sm:text-base">{{ formateGenres(genres) }}</div>
        <div class="text-xs sm:text-base">{{ formateAddress(address) }}</div>
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

.favorite-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
}

.favorite-icon i {
  font-size: 24px;
  color: #f44336;
}
</style>
