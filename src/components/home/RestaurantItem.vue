<template>
  <v-container class="justify-center text-center">
    <Modal
      @close="toggleModal"
      :modalActive="modalActive"
      :id="id"
      :name="name"
    />
    <v-card elevation="0">
      <v-card-title>{{ name }}</v-card-title>
      <v-card-item v-if="visited">Already visited</v-card-item>

      <v-card-item>{{ formateRating(rating) }}</v-card-item>
      <v-card-item>{{ formatePriceRange(price_range) }}</v-card-item>
      <v-card-item>{{ formateTel(tel) }}</v-card-item>
      <v-card-item>{{ formateGenres(genres) }}</v-card-item>
      <v-card-item>{{ formateAddress(address) }}</v-card-item>
      <v-card-item>
        <v-btn class="bg-amber-accent-1 m-2" @click="goToRestaurantPage(id)"
          >Go to page</v-btn
        >
        <v-btn class="m-2" @click="toggleModal">Give a review</v-btn>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import Modal from "@/components/home/Modal.vue";
import { ref } from "vue";

const router = useRouter();
defineProps({
  name: String,
  tel: String,
  price_range: Number,
  rating: Number,
  genres: Array,
  address: String,
  id: String,
  visited: Boolean,
});

const modalActive = ref(false);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const goToRestaurantPage = function (id) {
  router.push(`/restaurant/${id}`);
};

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

<style scoped>
.v-container {
  background: white;
  font-family: "Helvetica Neue", Arial, sans-serif;
  padding: 20px;
  border: 3px solid #000;
  box-shadow: 10px 15px 0px black;
}
.v-btn {
  background: white;
  font-family: "Helvetica Neue", Arial, sans-serif;
  border: 3px solid #000;
  box-shadow: 5px 10px 0px black;
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
