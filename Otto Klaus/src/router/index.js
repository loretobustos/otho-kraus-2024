import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Juguetes from "@/views/Juguetes";
import Agregar from "@/views/Agregar";
import Editar from "@/views/Editar";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/juguetes",
      name: "juguetes",
      component: Juguetes,
      meta: { login: true },
    },
    {
      path: "/agregar",
      name: "agregar",
      component: Agregar,
      meta: { login: true },
    },
    {
      path: "/editar",
      name: "editar",
      component: Editar,
      props: true,
      meta: { login: true },
    },
    {
      path: "*",
      redirect: "/login",
    },
  ],
});

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  let authRequired = to.matched.some((route) => route.meta.login);

  if (!user && authRequired) {
    next("login");
  } else if (user && !authRequired) {
    next("lista");
  } else {
    next();
  }
});

export default router;
