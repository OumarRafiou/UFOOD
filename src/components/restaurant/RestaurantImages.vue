<script setup>
defineProps({ pictures: Array });
</script>

<template>
  <v-container>
    <v-card class="" elevation="0">
      <v-card-item>
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="picture in pictures"
            :key="picture"
            :src="picture"
            cover
          ></v-carousel-item>
        </v-carousel>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  background: white;
  color: #fff;
  font-family: "Helvetica Neue", Arial, sans-serif;
  padding: 20px;
  border: 3px solid #000;
  box-shadow: 10px 15px 0px black;
}
</style>
