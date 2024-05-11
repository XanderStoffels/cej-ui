import { createApp } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";

import "./style.css";
import App from "./App.vue";

import Home from "./pages/Home.vue";
import About from "./pages/About.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
