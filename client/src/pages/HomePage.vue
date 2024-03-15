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
        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { topicsService } from '../services/TopicsService';
import Pop from '../utils/Pop';


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


    }
  }
}
</script>

<style scoped lang="scss">
.emoji {
  color: white;
  padding-top: 0px;
  padding-bottom: 1px;
  padding-left: 3px;
  padding-right: 3px;
  margin: 5px;
}

.emoji:hover {
  text-shadow: 0px 0px 30px rgba(255, 255, 255, 1);
}
</style>