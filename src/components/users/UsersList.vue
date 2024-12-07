<template>
  <div>
    <Loading :is-loading="!isLoaded" />
    <v-container class="bg-surface-variant" v-if="isLoaded">
      <v-row no-gutters>
        <v-col v-for="id in userInfos" :key="id">
          <v-sheet class="pa-4 ma-6"><UserCard :id="id"></UserCard></v-sheet>
        </v-col>

        <v-responsive width="100%"></v-responsive>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
import UserCard from "./UserCard";

import { ref } from "vue";

import {
  getAllUsersInfo,
  getUserInfoFollowing,
} from "../../composables/useUser";
import Loading from "../navigation/Loading.vue";
import Cookies from "js.cookie";

const userInfos = ref([]);
const token = Cookies.get("connectionToken");
const isLoaded = ref(false);

const getUserInfo = async () => {
  userInfos.value = await getAllUsersInfo(token.token);
  isLoaded.value = true;
};

getUserInfo();
</script>
