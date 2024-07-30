<template>
  <div class="card mt-5" :class="{ 'unclickable': grayscale }" @click="handleClick">
    <img :src="pokemon.sprites?.front_default || 'placeholder_image_url'" :class="{'grayscale': grayscale}" class="card-img-top" alt="pokemon image">
    <div class="card-body">
      <h5 class="card-title">{{ pokemon.name }}</h5>
      <p class="card-text">Type: {{ pokemon.types ? pokemon.types[0].type.name : '' }}</p>
      <p class="card-text">Weight: {{ pokemon.weight ? pokemon.weight : '' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object,
    grayscale: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (!this.grayscale) {
        this.$router.push(`/pokemon/${this.pokemon.id}`)
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 18rem;
  margin: auto;
  cursor: pointer;
  background-color: red;
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
.grayscale {
  filter: grayscale(100%);
}
.unclickable {
  cursor: not-allowed;
}
.unclickable:hover {
  transform: none;
}
</style>
