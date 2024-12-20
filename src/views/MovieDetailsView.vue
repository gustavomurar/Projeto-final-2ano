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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet">

  <div class="main" :style="{
    backgroundImage: `url('https://image.tmdb.org/t/p/w500${movieStore.currentMovie.poster_path}')`
    
  }"
  >
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
        class="poster"
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
    <template v-for="company in movieStore.currentMovie.production_companies" :key="company.id">
      <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`" :alt="company.name" />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
</template>


<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #202020;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, #2b2b2b, #000000);
  font-family: "Poppins", serif;
  height: 95vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.poster {
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

}

.poster:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.8);
}

.content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  column-gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin-left: 40px;
  margin-top: 15vh;
  background-color: #202020b0;
  
}

.content img {
  border-radius: 8px;
  max-width: 300px;
  object-fit: cover;
  box-shadow: 0 4px 8px #ffffff33;
  
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.details h1 {
  font-size: 2rem;
  color: #ffffff;
  margin-left: 20px;
}

.details p {
  font-size: 1rem;
  color: #ffffff;
  line-height: 1.5;
  margin-top: 40px;
}

.companies-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800 ;
  color: #202020;
  margin: 2rem 0 1rem;
}

.companies {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
