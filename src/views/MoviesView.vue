<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
import { useRouter } from 'vue-router'

const router = useRouter()
const genreStore = useGenreStore();
const isLoading = ref(false);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');


onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});
const movies = ref([]);

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}
</script>
<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
<br>
<ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }">
      {{ genre.name }}
    </li>
  </ul>
  <h1>FILMES</h1>

  <loading v-model:active="isLoading" is-full-page />
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">

      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
        @click="openMovie(movie.id)" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">

          <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }">
            {{ genreStore.getGenreName(genre_id) }}
          </span>

        </p>
      </div>
    </div>
  </div>

</template>
<style scoped>
/* Estilos globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f8f8f8;
  color: #333;
  padding: 2rem 1rem;
  font-family: "Poppins", serif;

}

/* Título da página */
h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #202020;
  margin-bottom: 3rem;
}

/* Lista de gêneros */
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #202020;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.genre-item:hover {
  background-color: #ffffff;
  border: solid .5px #000 ;
  color: #000;
  transition: 1s;
}

.genre-item.active {
  background-color: #ffffff;
  border: solid .5px #000 ;
  color: #000;
  font-weight: 600;
}

/* Lista de filmes */
.movie-list {
  display: grid;
  grid-template-columns: repeat(4, .2fr); /* Adiciona 4 colunas */
  gap:2rem;
  margin-left: 36vh;
  justify-items: center;
}

/* Cartão do filme */
.movie-card {
  width: 100%; /* Ocupa 100% da coluna */
  max-width: 15rem; /* Limita o tamanho máximo */
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  background-color: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
}

/* Imagem do filme */
.movie-card img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  transition: opacity 0.3s;
}

.movie-card img:hover {
  opacity: 0.8;
}

/* Detalhes do filme */

.movie-title {
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.3rem;
  height: 3.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Poppins", serif;
}

.movie-release-date {
  font-size: 0.9rem;
  color: #777;
  margin-left: 2.5vh;
  font-family: "Poppins", serif;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.movie-genres span {
  background-color: #202020;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.movie-genres span:hover {
  background-color: #ffffff;
  color: #202020;
  border: solid .5px #000;
  transition: 1s;
}

.movie-genres span.active {
  background-color: #f5f5f5;
  border: solid .5px #000;
  color: #000;
  font-weight: bold;
}

/* Responsividade */
@media (max-width: 1024px) {
  .movie-list {
    grid-template-columns: repeat(3, 1fr); /* 3 colunas em telas médias */
  }
}

@media (max-width: 768px) {
  .movie-list {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas em telas pequenas */
  }

  .movie-card {
    width: 80%;
  }
}

@media (max-width: 480px) {
  .movie-list {
    grid-template-columns: 1fr; /* 1 coluna em telas muito pequenas */
  }

  .movie-card {
    width: 90%;
    height: auto;
  }
}
</style>
