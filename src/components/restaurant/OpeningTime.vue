<script setup>
defineProps({ opening_hours: Object });

const formateDay = function (day) {
  return `${day.toUpperCase()}`;
};
const formateHours = function (hours) {
  if (!hours) {
    hours = "CLOSED";
  }
  return hours;
};
</script>

<template>
  <v-container>
    <v-card title="WEEKLY SCHEDULE" class="text-center" elevation="0">
      <v-card-item>
        <v-row class="justify-center">
          <v-col v-for="(hours, day) in opening_hours" :key="day" cols="7">
            <v-sheet class="border-b">
              <div class="text-xs sm:text-base">{{ formateDay(day) }}</div>
              <div class="text-xs sm:text-base">{{ formateHours(hours) }}</div>
            </v-sheet>
          </v-col>
        </v-row>
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
