<template>
  <div>
    <div class="w-full">
      <div
        class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm"
      >
        <Loading :is-loading="!isLoaded" />
        <p v-if="userInfos.length === 0 && isLoaded">
          You are following nobody
        </p>
        <a
          href="#"
          class="w-full text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150"
          v-for="userInfo in userInfos"
          :key="userInfo.id"
          >{{ userInfo.name + " - " + userInfo.email
          }}<v-btn
            class="mx-5"
            icon="mdi-account-remove-outline"
            size="small"
            @click="handleDeleteFollower(userInfo.id)"
          ></v-btn>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Cookies from "js.cookie";
import Loading from "../../navigation/Loading.vue";

import {
  getUserInfoFollowing,
  deleteFollower,
} from "../../../composables/useUser";
const isLoaded = ref(false);
const userInfos = ref([]);
const token = Cookies.get("connectionToken");

const getInfos = async () => {
  userInfos.value = await getUserInfoFollowing(token.token, token.id);
  isLoaded.value = true;
};

const handleDeleteFollower = async (id) => {
  await deleteFollower(token.token, id);
  userInfos.value = userInfos.value.filter((userInfo) => userInfo.id !== id);
};
getInfos();
</script>
