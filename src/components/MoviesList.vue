<template>
  <div class="container">
    <div class="movies-container">
      <h2>Movies</h2>
      <div class="movies-list">
        <movie-item
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          class="movie-item"
        ></movie-item>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem";
import gql from "graphql-tag";
const GET_MOVIES = gql`
  query getMovies {
    movies {
      id
      title
      director
      composer
      release_date
    }
  }
`;
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
  name: "App",
  components: { MovieItem },
  data() {
    return {
      movies: [],
      title: "",
      director: "",
      composer: "",
      release_date: "",
    };
  },
  apollo: {
    movies: {
      query: GET_MOVIES,
    },
  },
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
.movies-container,
.submit-form-container {
  width: 60%;
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movies-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1.5rem;
}

.movie-item {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
