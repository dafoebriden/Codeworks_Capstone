<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid my-2">
      <div class="row height small-screen">
        <div class="col-11 col-lg-2 bar p-0 d-flex flex-column">
          <div class="d-flex flex-column justify-content-end mb-3 line-bottom">
            <RouterLink class="bar-tag " :to="{ name: 'Home' }"><span class="fs-2">🏡</span> Home
            </RouterLink>
            <RouterLink class="bar-tag" :to="{ name: 'Home' }"><span class="fs-2">🔥</span> Hot Topics
            </RouterLink>
          </div>
          <div class="px-2">
            <form>
              <div>
                <input type="email" class="form-control search-bar" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder="🔍 Search Blaze">
              </div>
            </form>
          </div>
        </div>
        <div class="col-11 col-lg-10 main-page">
          <router-view />
        </div>
      </div>
    </div>
  </main>

</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

// .height {
//   display: flex;
//   align-items: stretch;
// }

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.bar {
  background-color: black;
}

.search-bar {
  box-shadow: inset -4px 4px 10px 0px black;
  margin: auto;
  max-width: 400px;
}

.bar-tag {
  color: white;
  font-size: larger;
  padding-top: 0px;
  padding-bottom: 1px;
  padding-left: 3px;
  padding-right: 3px;
  margin: 3px;
  border-radius: 10px;
  // background-color: rgba(255, 255, 255, .1);
}

.line-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  padding-bottom: 4px;
}

.bar-tag:hover {
  // color: black;
  // background-color: white;
  background-color: rgba(255, 255, 255, .4);
  box-shadow: inset 0px 0px 10px 2px black, inset 0px 0px 40px 0px black, 0px 0px 50px -1px rgba(255, 255, 255, .4);

  align-items: center;
}

main {
  background-color: black;
}



.small-screen {
  justify-content: center;
}

@media screen and (min-width: 576px) {
  .height {
    height: 92vh;
  }
}

@media screen and (min-width: 992px) {
  .main-page {
    background-color: black;
    border-left: 1px solid rgba(255, 255, 255, .5);
  }
}
</style>
