<template>
  <div class="submit-form-container">
    <h2>Add Movie</h2>
    <form @submit.prevent="submit" class="submit-form">
      <div class="form-group">
        <input type="text" placeholder="Title" v-model="title" />
      </div>
      <div class="form-group">
        <input type="text" placeholder="Director" v-model="director" />
      </div>
      <div class="form-group">
        <input type="text" placeholder="Composer" v-model="composer" />
      </div>
      <div class="form-group">
        <input type="text" placeholder="Release date" v-model="release_date" />
      </div>
      <button type="submit" class="submit-button">Send</button>
    </form>
  </div>
</template>

<script>
import gql from "graphql-tag";
// import { InMemoryCache } from "apollo-cache-inmemory";
const ADD_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $director: String!
    $composer: String!
    $release_date: date!
  ) {
    insert_movies(
      objects: [
        {
          title: $title
          director: $director
          composer: $composer
          release_date: $release_date
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;
export default {
  name: "AddMovie",
  data() {
    return {
      title: "",
      director: "",
      composer: "",
      release_date: "",
    };
  },
  apollo: {},
  methods: {
    submit() {
      const { title, director, composer, release_date } = this.$data;
      this.$apollo.mutate({
        mutation: ADD_MOVIE,
        variables: {
          title,
          director,
          composer,
          release_date,
        },
        refetchQueries: ["getMovies"],
      });
      this.title = "";
      this.director = "";
      this.composer = "";
      this.release_date = "";
    },
  },
};
</script>
<style>
.container {
  display: flex;
  /* justify-content: space-around; */
  margin: 2rem;
}

.submit-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
