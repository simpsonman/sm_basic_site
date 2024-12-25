import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import router from "./router/index";
import i18n from "./i18n";

// Import Quasar css
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Quasar, {
  plugins: {}, // Quasar 플러그인을 여기에 추가
});

app.mount("#app");
