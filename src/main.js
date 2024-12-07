import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "./input.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});
app.use(router);
app.use(vuetify);
app.mount("#app");
