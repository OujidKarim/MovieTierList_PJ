Vue.component("MoviePosters", {
  props: ["movies", "showButton"],
  template: `
  <div class="container">
        <draggable item-key='id' class='row' v-model="movies">
            <li class="col-xl-3 col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center"  v-for="movie in movies" :key="movie.title">
            <div class="card" style="width: 18rem">          
            <img class="card-img-top" :src="movie.poster" alt="CardImageMoviePoster" />
            <div class="card-body">
              <h5 class="card-title">{{movie.title}}</h5>
            </div>      
            
            </li>
        </draggable>

          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-success mt-3" v-on:click="saveOrder">Valider le vote</button>
          </div>
  </div>  
`,
  methods: {
    saveOrder() {
      /* localStorage.setItem("moviesOrder", this.movies);
      localStorage.getItem("moviesOrder")
      console.log(moviesOrder); */
    },
  },
});

new Vue({
  el: "#app",
  data: {
    categories: [],
    movies: [],
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      let url = "https://api.themoviedb.org/3/genre/movie/list";
      axios
        .get(url, {
          params: {
            api_key: "b73ad2eaa4501675efa5fdf8edb150d9",
          },
        })
        .then((response) => {
          this.categories = response.data.genres.map((category) => ({
            id: category.id,
            name: category.name
              .replace("Adventure", "Aventure")
              .replace("Animation", "Animation")
              .replace("Comedy", "Comédie")
              .replace("Documentary", "Documentaire")
              .replace("Drama", "Drame")
              .replace("Family", "Familial")
              .replace("Fantasy", "Fantastique")
              .replace("History", "Histoire")
              .replace("Horror", "Horreur")
              .replace("Music", "Musical")
              .replace("Mystery", "Mystère")
              .replace("Science Fiction", "Science-fiction")
              .replace("War", "Guerre")
              .replace("TV Movie", "Téléfilm"),
          }));
        });
    },
    getMoviesByCategory(category) {
      console.log(category);
      this.movies = [];
      const url = "https://api.themoviedb.org/3/discover/movie";
      axios
        .get(url, {
          params: {
            api_key: "b73ad2eaa4501675efa5fdf8edb150d9",
            with_genres: category.value,
            sort_by: "vote_count.desc",
            include_adult: false,
            include_video: false,
            language: "fr-FR",
            page: 1,
          },
        })
        .then((response) => {
          this.movies = response.data.results.slice(0, 10).map((x) => 
            {return{ poster: "https://image.tmdb.org/t/p/w500" + x.poster_path,
            title: x.title,}}
          );
          console.log(this.movies)
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    },
  },
});


