<template>
  <div id="app" class="app-style vt323-regular">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.app-style {
  min-height: 100vh; 
  background-image: url('/background.jpg');
  width: 100%; 
  margin: 0;
  padding: 0;
}
</style>