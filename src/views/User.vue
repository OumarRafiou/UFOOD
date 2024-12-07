<template>
  <v-card v-if="isLoaded">
    <v-toolbar color="red">
      <v-toolbar-title class="d-flex flex-row">
        <v-card-item> {{ user.name }} </v-card-item>
        <v-card-item> Score: {{ score }} </v-card-item>
      </v-toolbar-title>
    </v-toolbar>
    <div class="d-flex flex-row">
      <v-tabs v-model="tab" direction="vertical" color="red">
        <v-tab value="option-1" @click="reload">
          <v-icon start> mdi-star</v-icon>
          Favorites
        </v-tab>
        <v-tab value="option-2" @click="reload">
          <v-icon start>mdi-account-star </v-icon>
          Followers
        </v-tab>
        <v-tab value="option-3" @click="reload">
          <v-icon start>mdi-account-plus-outline </v-icon>
          Following
        </v-tab>
        <v-tab value="option-4" @click="reload">
          <v-icon start> mdi-history </v-icon>
          Recent visits
        </v-tab>
        <v-tab value="option-6" @click="reload">
          <v-icon start> mdi-account-question </v-icon>
          Search Users
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <v-card flat>
            <v-card-text>
              <p>
                <UsersFavorite></UsersFavorite>
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-2">
          <v-card flat>
            <v-card-text>
              <p>
                <FollowersCard></FollowersCard>
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-3">
          <v-card flat>
            <v-card-text>
              <p>
                <FollowingCard></FollowingCard>
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-4">
          <v-card flat>
            <v-card-text>
              <p>
                <UsersVisitedRestaurants></UsersVisitedRestaurants>
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-6">
          <v-card flat>
            <v-card-text>
              <p><UserSearch></UserSearch></p>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import { getVisitedRestaurant } from "../composables/useUser";
import { getUserInfo } from "../composables/useUser";

import UsersVisitedRestaurants from "../components/users/UsersVisitedRestaurants.vue";
import UsersFavorite from "../components/users/UsersFavorite.vue";
import UserSearch from "../components/users/search/UserSearch.vue";
import FollowersCard from "../components/users/follow/FollowersCard.vue";
import FollowingCard from "../components/users/follow/FollowingCard.vue";

import Cookies from "js.cookie";

export default {
  components: {
    UsersVisitedRestaurants,
    UsersFavorite,
    FollowersCard,
    FollowingCard,
    UserSearch,
  },
  data() {
    return {
      isLoaded: true,
    };
  },
  methods: {
    async reload() {
      this.isLoaded = false;
      this.$nextTick(() => {
        this.isLoaded = true;
      });
    },
  },
  setup(props) {
    const state = reactive({
      user: {},
      score: "0",
    });
    const tab = ref("option-1");
    const options = [
      {
        value: "option-1",
        label: "Option 1",
        icon: "mdi-star",
      },
      {
        value: "option-2",
        label: "Option 2",
        icon: "mdi-account-star",
      },
      {
        value: "option-3",
        label: "Option 3",
        icon: "mdi-account-plus-outline",
      },
      {
        value: "option-4",
        label: "Option 4",
        icon: "mdi-history",
      },
      {
        value: "option-6",
        label: "Option 6",
        icon: "mdi-account-question ",
      },
    ];

    onMounted(async () => {
      const token = Cookies.get("connectionToken");
      state.user = await getUserInfo(token.id);

      const visitedRestaurantData = await getVisitedRestaurant(token.id);
      if (visitedRestaurantData && visitedRestaurantData.total) {
        state.score = visitedRestaurantData.total;
      }
    });
    return {
      ...toRefs(state),
      tab,
      options,
    };
  },
};
</script>
