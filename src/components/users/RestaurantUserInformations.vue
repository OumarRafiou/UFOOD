<script setup>
const props = defineProps({
  name: String,
  comment: String,
  rating: Number,
  date: String,
});
const formateTime = function (time) {
  const part = time.split("-");
  return +part[0] + "-" + part[1] + "-" + part[2].slice(0, 2);
};
</script>

<template>
  <v-card min-width="200">
    <div class="favorite-icon">
      <i class="far fa-heart"></i>
    </div>
    <v-card :title="name" class="text-sm" elevation="0">
      <v-card-item>
        <div class="text-xs sm:text-base">Comment: {{ comment }}</div>
        <div class="text-xs sm:text-base">Rating: {{ rating }}</div>
        <div class="text-xs sm:text-base">Date: {{ formateTime(date) }}</div>
      </v-card-item>
    </v-card>
  </v-card>
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
