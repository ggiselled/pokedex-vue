<template>
  <div class="filter">
    <div class="btn btn-todos" @click="setFilter('ALL')">TODOS</div>
    <div class="btn btn-descubiertos" @click="setFilter('DISCOVERED')">
      DESCUBIERTOS
    </div>
    <div class="btn btn-perdidos" @click="setFilter('TO_DISCOVER')">
      PERDIDOS
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokedex: {
      type: Array,
      required: true,
    },
    allPokemons: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setFilter(filter) {
      let filteredPokemons;
      if (filter === "DISCOVERED") {
        filteredPokemons = this.allPokemons.filter((pokemon) =>
          this.pokedex.some((p) => p.id === pokemon.id)
        );
      } else if (filter === "TO_DISCOVER") {
        filteredPokemons = this.allPokemons.filter(
          (pokemon) => !this.pokedex.some((p) => p.id === pokemon.id)
        );
      } else {
        filteredPokemons = this.allPokemons;
      }
      this.$emit("update:filter", filteredPokemons);
    },
  },
};
</script>

<style scoped>
@import '../style/button.css';
.filter {
  margin-bottom: 20px;
}

</style>
