new Vue({
  el: '#app',
  data: {
    categories: [],
  },
  mounted() {
    this.getAllCategories();
  },
  methods : {
    getAllCategories() {
        let url = 'https://api.themoviedb.org/3/genre/movie/list'
        axios
            .get(url, {
                params: {
                    api_key: 'b73ad2eaa4501675efa5fdf8edb150d9'
                }
            })
            .then(response => {
                this.categories = response.data.genres;
            })
    },
  }
})
