<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="bg-white rounded-lg shadow-lg px-6 py-4">
        <v-alert v-if="alert.show" :type="alert.type" class="mb-4">
          {{ alert.message }}
        </v-alert>
        <h2 class="text-lg font-medium mb-2">Add a new restaurant</h2>
        <div class="mt-4">
          <label
            for="restaurant-id"
            class="block text-gray-700 font-medium mb-2"
            >Restaurant Name</label
          >
          <select
            v-model="restaurantID"
            id="restaurant-id"
            name="restaurant-id"
            class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option v-for="val of restaurantList" :key="val.id" :value="val.id">
              {{ val.name }}
            </option>
          </select>
        </div>
        <div class="mt-6">
          <button
            @click="submitNewRestaurant"
            type="button"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Restaurant
          </button>
          <button
            @click="closeModal"
            type="button"
            class="ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllRestaurants } from "../../composables/useRestaurantsForUser";
export default {
  data() {
    return {
      restaurantID: "",
      restaurantList: [],
      alert: { show: false, message: "", type: "" },
    };
  },
  methods: {
    submitNewRestaurant() {
      if (this.restaurantID === "" || this.restaurantID === null) {
        this.alert.show = true;
        this.alert.type = "error";
        this.alert.message = "Must select a restaurant!";
        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
        return;
      }
      this.$emit("addedRestaurent", this.restaurantID);
      this.alert.show = true;
      this.alert.type = "success";
      this.alert.message = "List created!";
      setTimeout(() => {
        this.alert.show = false;
      }, 5000);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
  async created() {
    this.restaurantList = await getAllRestaurants();
    this.restaurantList.sort((a, b) => a.name.localeCompare(b.name));
  },
};
</script>
