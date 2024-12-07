<template>
  <v-container>
    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in listeOfAllUsers" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.rating }}</td>
          <td>
            <v-btn
              class="mx-5"
              icon="mdi-account-plus-outline"
              size="small"
              @click="handleFollowUser(user.id)"
            ></v-btn>
            <v-btn
              class="mx-5"
              icon="mdi-account-remove-outline"
              size="small"
              @click="handleDeleteFollower(user.id)"
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
<script setup>
import { useRouter } from "vue-router";
import Cookies from "js.cookie";
import { ref } from "vue";
import { followUser, deleteFollower } from "../../../composables/useUser";

const router = useRouter();
const props = defineProps({
  listeOfAllUsers: Object,
});
const handleFollowUser = async (id) => {
  const token = Cookies.get("connectionToken").token;
  await followUser(token, id);
  //Doit vérifier cette ligne
  //userInfos.value = userInfos.value.filter((userInfo) => userInfo.id !== id);
};
const handleDeleteFollower = async (id) => {
  const token = Cookies.get("connectionToken");
  await deleteFollower(token.token, id);
  //userInfos.value = userInfos.value.filter((userInfo) => userInfo.id !== id);
};
</script>
