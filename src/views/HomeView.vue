<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <div class="home-container">
    <br>
    <h1>Bem-vindo ao Mundo do Entretenimento</h1>
    <p class="intro-text">Explore os filmes e programas de TV mais populares. Selecione uma das opções abaixo para começar a navegação.</p>
    
    <!-- Botões de navegação -->
    <div class="buttons-container">
      <button @click="goToMovies" class="nav-button">Filmes</button>
      <button @click="goToTvs" class="nav-button">Programas de TV</button>
    </div>

    <!-- Filmes em Destaque -->
    <div class="featured-movies">
      <h2>Filmes em Destaque</h2>
      <div class="movie-grid">
        <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="openMovie(movie.id)">
          <div class="image-container">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
          </div>
          <div class="movie-title">{{ movie.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const movies = ref([]);

// Carregar filmes em destaque na montagem da página
onMounted(async () => {
  const response = await api.get('discover/movie', {
    params: {
      language: 'pt-BR',
      sort_by: 'popularity.desc', // Filmes mais populares
      page: 1
    }
  });
  movies.value = response.data.results.slice(0, 10); // Limitar a 10 filmes em destaque
});

// Função para abrir a página de detalhes do filme
function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

// Navegação para a página de Filmes
function goToMovies() {
  router.push({ name: 'Movies' });
}

// Navegação para a página de Programas de TV
function goToTvs() {
  router.push({ name: 'Tvs' });
}
</script>

<style scoped>
/* Estilos globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #202020; /* Cor de fundo escura */
  color: #fff; /* Texto em branco para contraste */
  font-family: "Poppins", serif;
  padding: 2rem 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Estilo do container principal */
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 3rem;
}

/* Título da página */
h1 {
  font-size: 2.5rem;
  color: #202020;  /* Cor preta */
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 900;
  transition: color 0.3s ease;
}

/* Texto de introdução */
.intro-text {
  font-size: 1.1rem;
  color: #202020;  /* Cor preta */
  text-align: center;
  margin-bottom: 2rem;
  transition: color 0.3s ease;
}

/* Botões de navegação */
.buttons-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.nav-button {
  background-color: #cfcfcfc0;
  color: #202020;  /* Cor preta */
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  padding: 1rem 2rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s, color 0.3s;
  width: 12rem;
  height: 4rem;
}

.nav-button:hover {
  background-color: #202020;
  box-shadow: 0 0 0.5rem #929292;
  transition: 1s;
  color: #fff;  /* Cor branca no hover */
}

.nav-button:focus {
  outline: none;
}

/* Filmes em Destaque */
.featured-movies {
  margin-top: 3rem;
  text-align: center;
}

.featured-movies h2 {
  font-size: 2rem;
  color: #202020;  /* Cor preta */
  margin-bottom: 2rem;
  transition: color 0.3s ease;
}

/* Grid de Filmes */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));  /* Ajustando para maior flexibilidade */
  gap: 2rem;
  justify-items: center;
  padding: 0 1rem;
}
/* Estilo dos Cards */
.movie-card {
  width: 100%;
  max-width: 300px;  /* Definindo um tamanho fixo máximo */
  border-radius: 1rem;
  overflow: hidden;
  background-color: #2c2c2c; /* Cor de fundo mais escura */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);  /* Sombras mais suaves */
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  position: relative;  /* Necessário para a sobreposição do título */
}

.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.8); /* Efeito de hover com sombra maior */
}

/* Contêiner da Imagem */
.image-container {
  width: 100%;
  height: 400px; /* Tamanho fixo para a imagem */
  overflow: hidden;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: relative;
}

/* Imagem dentro do Card */
.movie-card img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garantindo que a imagem cubra toda a área sem distorção */
  transition: opacity 0.5s ease-in-out;  /* Transição suave da imagem */
}

/* Transição do Título do Filme */
.movie-card .movie-title {
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.842), rgba(0, 0, 0, 0)); /* Degradê preto */
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;  /* Inicialmente invisível */
  transform: translateY(20px);  /* Desloca o título para fora inicialmente */
  transition: opacity 0.5s ease, transform 0.5s ease;  /* Transições suaves */
}

/* Mostrar o título e aplicar o degradê quando o card é hover */
.movie-card:hover .movie-title {
  opacity: 1;
  transform: translateY(0);  /* Traz o título para dentro do card */
}

/* Responsividade */
@media (max-width: 768px) {
  .nav-button {
    width: 10rem;
    font-size: 1rem;
  }

  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));  /* Ajustando o tamanho para dispositivos menores */
  }

  .movie-title {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));  /* Ajustando o tamanho para dispositivos ainda menores */
  }

  .nav-button {
    width: 9rem;
    font-size: 0.9rem;
  }

  .movie-title {
    font-size: 0.9rem;
  }
}

</style>
