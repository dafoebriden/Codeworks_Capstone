<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
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
  margin: 5px;
  border-radius: 10px;
  // background-color: rgba(255, 255, 255, .1);
}

.bar-tag:hover {
  // color: black;
  // background-color: white;
  background-color: rgba(255, 255, 255, .4);
  box-shadow: inset 0px 0px 10px 2px black, inset 0px 0px 40px 0px black, 0px 0px 50px -1px rgba(255, 255, 255, .8);
  align-items: center;
}

.line-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, .5);
  padding-bottom: 4px;
}


main {
  background-color: black;
}

.main-page {
  background-color: black;
  border-left: 1px solid rgba(255, 255, 255, .5);
  overflow: auto;
}

.small-screen {
  justify-content: center;
}

@media screen and (min-width: 576px) {
  .height {
    height: 92vh;
  }
}
</style>
