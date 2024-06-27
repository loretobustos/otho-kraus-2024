import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

const store= new Vuex.Store({
  state: {
    juguete: {
      codigo: "",
      nombre: "",
      stock: 0,
      precio: 0,
    },
    edit: false,
    loading: false,
    juguetes: [],
  },

  mutations: {
    setJuguetes(state, juguetes) {
      state.juguetes = juguetes;
      state.loading = false;
    },
    loadingTable(state) {
      state.loading = true;
    },
    eliminarJuguete(state, juguete) {
      state.juguetes = state.juguetes.filter((j) => {
        return j.codigo !== juguete.codigo;
      });
    },
    actualizarJuguete(state, juguete) {
      state.juguetes = state.juguetes.map((j) => {
        if (j.codigo == juguete.codigo) return juguete;
        else return j;
      });
    },
    agregarJuguete(state, juguete) {
      state.juguetes.push(juguete);
    },
  },
  actions: {
    getJuguetes({ commit }) {
      commit("loadingTable");
      firebase
        .firestore()
        .collection("juguetes")
        .onSnapshot((snapshot) => {
          const juguetes = [];
          snapshot.forEach((doc) => {
            juguetes.push({ id: doc.id, data: doc.data() });
          });

          commit("setJuguetes", juguetes);
        });
    },
    agregarJuguete({ commit }, juguete) {
      commit("loadingTable");
      firebase
        .firestore()
        .collection("juguetes")
        .add(juguete)
        .then(commit("loadingTable"));
    },
    eliminarJuguete({ commit }, jugueteID) {
      commit("loadingTable");
      firebase
        .firestore()
        .collection("juguetes")
        .doc(jugueteID)
        .delete()
        .then(commit("loadingTable"));
    },
    async actualizarJuguete({ commit }, { juguete, id }) {
      commit("loadingTable");
      firebase
        .firestore()
        .collection("juguetes")
        .doc(id)
        .set(juguete)
        .then(commit("loadingTable"));
    },




    getJuguegtesByPart({ commit }) {
      commit("loadingTable");
      firebase
        .firestore()
        .collection("juguetes")
        .where("codigo", "==", "A0001")
        .where("precio", ">", "2000")
        .onSnapshot((snapshot) => {
          const juguetes = [];
          snapshot.forEach((doc) => {
            juguetes.push({ id: doc.id, data: doc.data() });
          });

          console.log(juguetes)
        });
    },





  },















  getters: {
    juguetesConStock({ juguetes }) {
      return juguetes.filter((juguete) => juguete.data.stock > 0);
    },
  },
});


export default store