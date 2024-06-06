import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

import "./style.css";
import App from "./App.vue";

import Home from "./pages/Home.vue";
import Draw from "./pages/Draw.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/draw", component: Draw },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
