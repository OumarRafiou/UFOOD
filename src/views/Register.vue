<template>
  <v-sheet width="300" class="mx-auto mt-5">
    <h2 class="text-center mb-4">SignUp</h2>
    <v-form validate-on="submit" @submit.prevent="submit">
      <!-- Add v-alert component -->
      <v-alert v-if="alert.show" :type="alert.type" class="mb-4">
        {{ alert.message }}
      </v-alert>
      <v-text-field
        v-model="name"
        label="Name"
        :rules="_nameRules"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        label="Email"
        :rules="_emailRules"
        required
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        :rules="_passwordRules"
        required
        type="password"
      ></v-text-field>
      <!-- Add second password field -->
      <v-text-field
        v-model="passwordConfirm"
        label="Confirm Password"
        :rules="_passwordConfirmRules"
        required
        type="password"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref, reactive } from "vue";
import { signUp } from "@/composables/useUserSession";
import { logIn } from "@/composables/UseRestaurant";
import Cookies from "js.cookie";
import { router } from "@/router";
import {
  passwordRules,
  nameRules,
  emailRules,
  validateRuleSet,
} from "@/composables/formRules.js";

const name = ref(null);
const email = ref(null);
const password = ref(null);
const passwordConfirm = ref(null);
const _nameRules = nameRules;
const _emailRules = emailRules;
const _passwordRules = passwordRules;
const _passwordConfirmRules = passwordRules;

const alert = reactive({
  show: false,
  message: "",
  type: "",
});

const submit = async () => {
  if (
    !validateRuleSet(name.value, nameRules) ||
    !validateRuleSet(email.value, emailRules) ||
    !validateRuleSet(password.value, passwordRules) ||
    !validateRuleSet(passwordConfirm.value, passwordRules) ||
    password.value !== passwordConfirm.value
  ) {
    alert.show = true;
    alert.type = "error";
    alert.message = "Passwords do not match.";
    return;
  }

  try {
    await signUp(name.value, email.value, password.value);
    alert.show = true;
    alert.type = "success";
    alert.message = "Successfully signed up!";
    await logIn(email.value, password.value);
    const user_id = Cookies.get("connectionToken").id;
    router.push({ name: "User", params: { currentUserID: user_id } });
  } catch (error) {
    alert.show = true;
    alert.type = "error";
    alert.message =
      error.message || "An error occurred during the signUp process.";
  }
};
</script>
