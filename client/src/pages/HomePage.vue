<template>
  <div class="container-fluid my-2">
    <div class="row height small-screen">
      <div class="col-11 col-lg-2 bar p-0 d-flex flex-column">
        <div class="d-flex flex-column justify-content-end mb-3 line-bottom">
          <div class="d-flex">
            <!-- <h3 class="emoji" role="button">🏡</h3> -->
            <RouterLink :to="{ name: 'Home' }"><button class="bar-tag bg-dark"> Home </button>
            </RouterLink>
          </div>
          <div class="d-flex">
            <!-- <h3 class="emoji" role="button">🔥</h3> -->
            <RouterLink :to="{ name: 'Home' }"><button class="bar-tag bg-dark"> Hot
                Topics</button>
            </RouterLink>
          </div>
        </div>
        <div class="px-2">
          <form>
            <!-- <div>
              <input type="email" class="form-control search-bar" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="🔍 Search Blaze">
            </div> -->
          </form>
        </div>
      </div>
      <div class="col-11 col-lg-10 main-page">
        <div class="row d-flex justify-content-evenly">
          <div class="topic-card" v-for="topic in topics" :key="topic.id">
            <div class="topic-img" :style="{ backgroundImage: `url(${topic.picture})` }"></div>
            <div class="topic-card-bot text-white">
              <div class="ms-3">
                <h1>{{ topic.name }}</h1>
                <p>{{ topic.quote }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { topicsService } from '../services/TopicsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';


export default {
  setup() {
    onMounted(() => {
      getTopics()
    })
    async function getTopics() {
      try {
        const topics = await topicsService.getTopics()
        return topics
      } catch (error) {
        Pop.error
      }
    }
    return {
      topics: computed(() => AppState.topics)

    }
  }
}
</script>

<style scoped lang="scss">
.topic-card {
  width: 300px;
  height: 300px;
  margin-bottom: 50px;
  margin-right: 25px;
  margin-left: 25px;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0px 0px 25px white;

}

.topic-img {
  height: 40%;
  object-position: center;
  width: 100%;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: inset 0px 0px 50px 5px black;
}

.topic-card-bot {
  height: 60%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: black;
  box-shadow: inset 0px 0px 15px 0px white;
}
</style>