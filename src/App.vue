<template>
  <div id="app">
    <div>
      <h3>Vue js GraphQL Hasura Demo</h3>
    </div>
    <add-movie />
    <movies-list />
  </div>
</template>

<script>
import MoviesList from "./components/MoviesList.vue";
import AddMovie from "./components/AddMovie.vue";

export default {
  name: "app",
  components: {
    MoviesList,
    AddMovie,
  },
};
</script>
<style scoped>
h3 {
  /* text-align: center; */
  padding-left: 7cm;
}
</style>
