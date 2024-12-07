<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="300" color="blue-lighten-1">
        <v-toolbar color="blue-darken-2">
          <template v-slot:prepend>
            <v-btn icon="$menu"></v-btn>
          </template>

          <v-toolbar-title class="text-h6">
            {{ id.name }}
          </v-toolbar-title>

          <template v-slot:append
            ><v-btn
              class="ma-2"
              color="black"
              icon="mdi-account-plus-outline"
              @click="handleFollowUser(token, id.id)"
            ></v-btn>
          </template>
        </v-toolbar>

        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">Recent Visits</div>

          <v-timeline density="compact" align="start">
            <v-timeline-item
              size="x-small"
              v-for="visit in visits"
              :key="visit"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  {{ visit.name }}
                </div>
                <div>{{ visit.comment }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getUserVisits, followUser } from "../../composables/useUser";
import { getRestaurantsNameByID } from "../../composables/UseRestaurant";

import Cookies from "js.cookie";

const props = defineProps({
  id: Object,
});

const visits = ref([]);
const token = Cookies.get("connectionToken");

const handleFollowUser = async (token, id) => {
  await followUser(token.token, id);
  //Doit vérifier cette ligne
  //userInfos.value = userInfos.value.filter((userInfo) => userInfo.id !== id);
};

const getVisits = async (token, id) => {
  const response = await getUserVisits(token, id);
  visits.value = response.slice(0, 3);
  visits.value.forEach(async (visit) => {
    const name = await getRestaurantsNameByID(visit.restaurant_id);
    visit["name"] = name;
  });
};
getVisits(token.token, props.id.id);
</script>
