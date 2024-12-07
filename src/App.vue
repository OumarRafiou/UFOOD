<template>
  <v-app id="app">
    <v-parallax
      src="https://img.freepik.com/free-vector/memphis-pattern-background_53876-89957.jpg?w=826&t=st=1678839222~exp=1678839822~hmac=10d9339284af800b1af37e28e457de3177aa60f265745aa38fba26bbf9685f72"
    >
      <nav-menu />
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-parallax>
  </v-app>
</template>

<script setup>
import Navigation from "@/components/navigation/Navigation.vue";
import { defineComponent } from "vue";

const navMenu = defineComponent(Navigation);
</script>

<style></style>
