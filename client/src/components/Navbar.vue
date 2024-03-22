<template>
  <div class="navbar nav px-3 py-0">
    <div class="d-flex">
      <router-link class="navbar-brand d-flex pt-0" :to="{ name: 'Home' }">
        <div class="d-flex flex-column align-items-center ">
          <h1 class="m-0"><i class="fw-bolder d-flex align-items-center"><span
                class="fire-text hanalei-font">blaze</span></i></h1>
        </div>
      </router-link>
      <div class="d-flex align-items-center">
        <div class="d-flex">
          <RouterLink :to="{ name: 'Home' }"><button class="bar-tag bg-dark"> Home </button>
          </RouterLink>
        </div>
        <div class="d-flex">
          <RouterLink :to="{ name: 'Home' }"><button class="bar-tag bg-dark"> Hot
              Topics</button>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="d-flex search-login">
      <div class="d-flex align-items-center input-group" style="max-width: 300px;">
        <span class="input-group-text bar-tag bg-dark me-0" id="basic-addon1">🔍</span>
        <input v-model="topicNameSearch" type="text" class="form-control bar-tag bg-dark searchBar text-white"
          id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Search Blaze">
      </div>
      <div class="d-flex">
        <button class="btn text-light py-0" @click="toggleTheme">
          <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
        </button>
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
export default {
  setup() {
    { }
    const topicNameSearch = ref('')
    const theme = ref(loadState('theme') || 'light')

    onMounted(() => {
      document.documentElement.setAttribute('data-bs-theme', theme.value)
    })

    return {
      theme,
      topicNameSearch,
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
  height: 150px;
  justify-content: center;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.fire-text {
  font-size: xxx-large;
}

.fire-text:hover {
  color: #f5f5f5;
  text-shadow: 0px -2px 4px #fff,
    0px -2px 10px #FF3,
    0px -10px 20px #F90,
    0px -20px 40px #C33;
}

.searchBar::-webkit-input-placeholder {
  color: white;
  font-style: italic;
}

@media screen and (min-width: 468px) {

  .navbar {
    height: 100px;
  }
}

@media screen and (min-width: 651px) {

  .navbar {
    height: 60px;
    justify-content: space-between;
  }
}
</style>
