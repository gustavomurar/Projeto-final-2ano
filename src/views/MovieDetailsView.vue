<script setup>
  import { defineProps, onMounted } from 'vue';
  import { useMovieStore } from '@/stores/movie';
  const movieStore = useMovieStore();

  const props = defineProps({
    movieId: {
      type: Number,
      required: true,
    },
  });

  onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
  });
</script>

<template>
  
  <div class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
      />

      <div class="details">
        <h1>Filme: {{ movieStore.currentMovie.title }}</h1>
        <p>{{ movieStore.currentMovie.tagline }}</p>
        <p>{{ movieStore.currentMovie.overview }}</p>
        <p>Orçamento: ${{ movieStore.currentMovie.budget }} reais</p>
        <p>Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
      </div>
    </div>
  </div>

  <p class="companies-title">Produtoras</p>
  <div class="companies">
    <template
      v-for="company in movieStore.currentMovie.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
  
</template>

<style scoped>
/* Estilização principal */
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Estilização do conteúdo */
.content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  column-gap: 2rem;
  width: 100%;
  max-width: 900px;
}

.content img {
  border-radius: 8px;
  max-width: 300px; /* Poster maior */
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Detalhes do filme */
.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.details h1 {
  font-size: 2rem;
  color: #333;
  margin: 0;
}

.details p {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

/* Título da seção "Produtoras" */
.companies-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 2rem 0 1rem;
}

/* Seção de produtoras */
.companies {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
}

.companies img {
  border-radius: 4px;
  max-width: 92px;
  object-fit: contain;
}

.companies p {
  font-size: 1rem;
  color: #444;
  margin: 0;
  text-align: center;
}



</style>