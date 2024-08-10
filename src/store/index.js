import { createStore } from "vuex";
import pokeStore from "./pokeStore";

export default createStore({
  modules: {
    pokeStore,
  },
});
