<template>
  <div v-if="pokemon" class="detail-conteiner">
    <div class="btn-details">
    <button class="btn btn-secondary" @click="goHome">
      <i class="bi bi-caret-left-square-fill"></i>
    </button>
    <div class="btn btn-toggle" @click="togglePokedex">
      {{ isInPokedex ? "ELIMINAR DE MI POKEDEX" : "AGREGAR A MI POKEDEX" }}
    </div>

    </div>
    <div class="detail-info">
      <div class="detail-img">
        <img
          :src="pokemon.sprites.front_default"
          alt="pokemon image"
          class="img-info"
        />
        <h1>{{ pokemon.name }}</h1>
        <p>TIPO: {{ pokemon.types[0].type.name }}</p>
        <p>PESO: {{ pokemon.weight }}</p>
        <p class="description">DESCRIPCIÓN: {{ description }}</p>
      </div>
      <div class="detail-mov">
        <h2>MOVIMIENTOS</h2>
        <ul>
          <li v-for="move in pokemon.moves" :key="move.move.name">
            {{ move.move.name }} |
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("poke", ["selectedPokemon", "description", "pokedex"]),
    pokemon() {
      return this.selectedPokemon;
    },
    isInPokedex() {
      return (
        this.pokedex &&
        this.pokedex.some((pokemon) => pokemon.id === this.pokemon.id)
      );
    },
  },
  created() {
    this.fetchPokemonDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions("poke", [
      "fetchPokemonDetails",
      "addPokemonToPokedex",
      "removePokemonFromPokedex",
    ]),
    togglePokedex() {
      if (this.isInPokedex) {
        this.removePokemonFromPokedex(this.pokemon.id);
      } else {
        this.addPokemonToPokedex(this.pokemon);
      }
      this.$router.push("/");
    },

    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
@import "../style/pokemonDetail.css";
@import "../style/button.css";
</style>
