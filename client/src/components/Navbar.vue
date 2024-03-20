<template>
  <div class="navbar px-3 py-0">
    <!-- <nav class="navbar navbar-expand-sm navbar-dark px-3"> -->
    <router-link class="navbar-brand d-flex pt-0" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center ">
        <h1 class="m-0"><i class="fw-bolder d-flex align-items-center"><span
              class="fire-text hanalei-font">blaze</span></i></h1>
      </div>
    </router-link>
    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarText"> -->
    <div class="d-flex align-items-center input-group" style="max-width: 300px;">
      <span class="input-group-text bar-tag bg-dark me-0" id="basic-addon1">🔍</span>
      <input type="text" class="form-control bar-tag bg-dark text-white" id="exampleInputEmail1"
        aria-describedby="emailHelp" placeholder=" Search Blaze">
    </div>
    <div class="d-flex">
      <button class="btn text-light py-0" @click="toggleTheme">
        <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
      </button>
      <Login />
    </div>
    <!-- </div> -->
    <!-- </nav> -->
  </div>
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

.navbar {
  background-color: black;
  display: flex;
  align-items: center;
  /* box-shadow: 0px 2px 15px white; */
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  height: 6vh;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.fire-text:hover {
  color: #f5f5f5;
  text-shadow: 0px -2px 4px #fff,
    0px -2px 10px #FF3,
    0px -10px 20px #F90,
    0px -20px 40px #C33;
}




@media screen and (min-width: 576px) {
  nav {
    height: 6vh;
  }
}
</style>
