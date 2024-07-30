<template>
  <div class="filter">
    <button class="btn btn-primary" @click="setFilter('ALL')">Todos</button>
    <button class="btn btn-success" @click="setFilter('DISCOVERED')">Descubiertos</button>
    <button class="btn btn-warning" @click="setFilter('TO_DISCOVER')">Por Descubrir</button>
  </div>
</template>

<script>
export default {
  props: {
    pokedex: {
      type: Array,
      required: true
    },
    allPokemons: {
      type: Array,
      required: true
    }
  },
  methods: {
    setFilter(filter) {
      let filteredPokemons;
      if (filter === 'DISCOVERED') {
        filteredPokemons = this.allPokemons.filter(pokemon => this.pokedex.some(p => p.id === pokemon.id));
      } else if (filter === 'TO_DISCOVER') {
        filteredPokemons = this.allPokemons.filter(pokemon => !this.pokedex.some(p => p.id === pokemon.id));
      } else {
        filteredPokemons = this.allPokemons;
      }
      this.$emit('update:filter', filteredPokemons);
    }
  }
}
</script>

<style scoped>
.filter {
  margin-bottom: 20px;
}
</style>