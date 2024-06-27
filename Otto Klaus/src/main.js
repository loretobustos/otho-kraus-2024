import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import firebase from "firebase"
import FirebaseConfig from "@/configs/Firebase";

firebase.initializeApp(FirebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
