<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-black px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1><i class="fw-bolder"><span class="fire-text">Blaze</span></i></h1>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarText">
      <div>
        <ul class="navbar-nav">
          <li>
            <router-link :to="{}" class="btn text-success lighten-30 selectable text-uppercase">

            </router-link>
          </li>
        </ul>
      </div>
      <div>
        <form>
          <div>
            <input type="email" class="form-control search-bar" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="🔍 Search Blaze">
          </div>
        </form>
      </div>

      <div class="d-flex">
        <button class="btn text-light" @click="toggleTheme">
          <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
        </button>
        <Login />
      </div>
    </div>
  </nav>
</template>

<script>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
export default {
  setup() {

    const theme = ref(loadState('theme') || 'light')

    onMounted(() => {
      document.documentElement.setAttribute('data-bs-theme', theme.value)
    })

    return {
      theme,
      toggleTheme() {
        theme.value = theme.value == 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', theme.value)
        saveState('theme', theme.value)
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.fire-text {
  font-family: "Open Sans", sans-serif;
  color: #f5f5f5;
  text-shadow: 0px -2px 4px #fff,
    0px -2px 10px #FF3,
    0px -10px 20px #F90,
    0px -20px 40px #C33;
}

.search-bar {
  box-shadow: inset -4px 4px 10px 0px black;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
