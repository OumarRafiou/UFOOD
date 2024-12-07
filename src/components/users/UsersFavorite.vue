<template>
  <div>
    <UsersModalFavoriteVue
      v-if="showModal"
      @close="showModal = false"
      @addedRestaurent="addRestoInList"
    ></UsersModalFavoriteVue>
    <div class="w-full">
      <v-alert v-if="alert.show" :type="alert.type" class="mb-4">
        {{ alert.message }}
      </v-alert>
      <div class="flex">
        <h3
          class="font-medium text-gray-900 text-left px-6 py-2 border-t flex-1"
        >
          Favorite restaurants
        </h3>
        <div class="relative inline-block">
          <input
            type="text"
            class="border border-gray-400 py-2 px-3 rounded-md"
            v-model="selectedListName"
            @click="toggleDropdown"
          />
          <select
            class="absolute right-0 top-full w-full border border-gray-400 rounded-r-md px-3 py-2 bg-gray-200"
            v-model="selectedListID"
            @change="selectOnChange"
            v-show="showDropdown"
          >
            <option v-for="val of lists" :key="val.id" :value="val.id">
              {{ val.name }}
            </option>
          </select>
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
            @click="addList"
          >
            Add
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
            @click="modifyList"
          >
            Modify
          </button>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
            @click="deleteList"
          >
            Delete
          </button>
        </div>
      </div>
      <div
        class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm"
      >
        <div
          class="w-full text-gray-600 py-4 pl-6 pr-3 block"
          v-for="val of selectedFavList"
          :key="val.id"
        >
          <a
            :href="'/restaurant/' + val.id"
            class="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
          >
            <img
              src="https://avatars0.githubusercontent.com/u/35900628?v=4"
              alt="Profile picture"
              class="rounded-full h-6 shadow-md inline-block mr-2"
            />
            {{ val.name }}
          </a>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
            :value="val.id"
            @click="deleteRestoList"
          >
            Delete
          </button>
        </div>
        <div>
          <button
            @click="showModal = true"
            class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add a restaurant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserFavoriteLists, getUserInfo } from "../../composables/useUser";
import {
  getFavoriteById,
  postNewList,
  deleteList,
  putList,
  deleteRestoFromList,
  postAddRestoInList,
} from "../../composables/useFavorite";
import { getRestaurantsNameByID } from "../../composables/useRestaurantsForUser";
import UsersModalFavoriteVue from "./UsersModalFavorite.vue";
import Cookies from "js.cookie";

export default {
  data: () => ({
    user: {},
    lists: [],
    selectedListID: "",
    selectedListName: "",
    showDropdown: false,
    selectedFavList: [],
    showModal: false,
    alert: { show: false, message: "", type: "" },
  }),
  components: {
    UsersModalFavoriteVue,
  },
  props: {
    token: {
      type: String,
    },
  },
  methods: {
    async selectOnChange(event) {
      this.selectedListName =
        event.target.options[event.target.selectedIndex].text;
      this.showDropdown = false;
      await this.changeSelectedListRestos();
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    async changeSelectedListRestos() {
      let restaurantsID = await getFavoriteById(this.selectedListID);
      let restaurants = [];
      for (let id of restaurantsID.restaurants) {
        let data = await getRestaurantsNameByID(id.id);
        restaurants.push({ name: data, id: id.id });
      }
      this.selectedFavList = restaurants;
    },
    async addList() {
      let payload = { name: this.selectedListName, owner: this.user.email };
      if (this.selectedListName === "" || this.selectedListName === null) {
        this.alert.show = true;
        this.alert.type = "error";
        this.alert.message = "List name cannot be empty!";
        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
        return;
      }
      const data = await postNewList(payload);
      if (data) {
        this.lists = (await getUserFavoriteLists(this.user.id)).items;
        this.selectedListID = data.id;
        this.selectedListName = data.name;
        await this.changeSelectedListRestos();
        this.alert.show = true;
        this.alert.type = "success";
        this.alert.message = "List created!";
        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
      }
    },
    async modifyList() {
      let payload = { name: this.selectedListName, owner: this.user.email };
      if (this.selectedListName === "" || this.selectedListName === null) {
        this.alert.show = true;
        this.alert.type = "error";
        this.alert.message = "List name cannot be empty";
        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
        return;
      }
      await putList(payload, this.selectedListID);
      this.lists = (await getUserFavoriteLists(this.user.id)).items;
      await this.changeSelectedListRestos();
      this.alert.show = true;
      this.alert.type = "success";
      this.alert.message = "List modified!";
      setTimeout(() => {
        this.alert.show = false;
      }, 5000);
    },
    async deleteList() {
      if (this.selectedListID === null || this.selectedListID === "") {
        this.alert.show = true;
        this.alert.type = "error";
        this.alert.message = "Cannot delete!";
        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
        return;
      }
      await deleteList(this.selectedListID);
      this.lists = (await getUserFavoriteLists(this.user.id)).items;
      if (this.lists.length > 0) {
        this.selectedListID = this.lists[0].id;
        this.selectedListName = this.lists[0].name;
        await this.changeSelectedListRestos();
      } else {
        this.selectedListID = null;
        this.selectedListName = null;
        this.alert.show = true;
        this.alert.type = "success";
        this.alert.message = "List deleted!";
        setTimeout(() => {
          this.alert.show = false;
        }, 5000);
      }
    },
    async addRestoInList(id) {
      await postAddRestoInList(this.selectedListID, id);
      await this.changeSelectedListRestos();
      this.showModal = false;
    },
    async deleteRestoList(event) {
      let restoID = event.target.value;
      await deleteRestoFromList(this.selectedListID, restoID);
      await this.changeSelectedListRestos();
    },
  },
  async created() {
    const token = Cookies.get("connectionToken");
    this.user = await getUserInfo(token.id);
    this.lists = (await getUserFavoriteLists(token.id)).items;
    if (this.lists.length > 0) {
      this.selectedListID = this.lists[0].id;
      this.selectedListName = this.lists[0].name;
      await this.changeSelectedListRestos();
    }
  },
};
</script>
