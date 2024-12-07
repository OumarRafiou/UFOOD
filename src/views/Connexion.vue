<script setup>
import { reactive, ref } from "vue";
import { router } from "@/router";
import { logIn } from "@/composables/UseRestaurant";
import Cookies from "js.cookie";
import {
  emailRules,
  passwordRules,
  validateRuleSet,
} from "@/composables/formRules.js";

const email = ref(null);
const password = ref(null);
const response = ref(null);
const token = ref(null);
const _emailRules = emailRules;
const _passwordRules = passwordRules;
const form = ref(null);

const alert = reactive({
  show: false,
  message: "",
  type: "",
});

const connection = async () => {
  try {
    if (
      !validateRuleSet(email.value, emailRules) ||
      !validateRuleSet(password.value, passwordRules)
    ) {
      return;
    }
    await logIn(email.value, password.value);
    const user_id = Cookies.get("connectionToken").id;
    router.push({ name: "User", params: { currentUserID: user_id } });
  } catch (error) {
    alert.show = true;
    alert.type = "error";
    alert.message =
      error.message || "An error occurred during the login process.";
  }
};
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form validate-on="submit" @submit.prevent="connection" ref="form">
      <v-alert v-if="alert.show" :type="alert.type" class="mb-4">
        {{ alert.message }}
      </v-alert>
      <v-text-field
        v-model="email"
        label="email"
        :rules="_emailRules"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="password"
        :rules="_passwordRules"
        type="password"
      ></v-text-field>

      <v-btn type="submit" block class="mt-2"> submit </v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped></style>
