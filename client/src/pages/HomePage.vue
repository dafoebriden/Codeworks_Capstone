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
        <div class="d-flex flex-wrap">
          <div class="tag" v-for="tag in tags" :key="tag.id">
            <div class="tag-top">
              <p class="m-0">{{ tag.emoji }}</p>
            </div>
            <div class="tag-bot">
              <p class="m-0">{{ tag.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-11 col-lg-10 main-page">
        <div class="row d-flex justify-content-evenly">
          <div @click="getTopic(topic.id)" class="topic-card selectable" role="button" v-for="topic in topics"
            :key="topic.id">
            <div class="topic-img" :style="{ backgroundImage: `url(${topic.picture})` }"></div>
            <div class="topic-card-bot">
              <div class="ms-3">
                <h1 class="mb-0">{{ topic.name }}</h1>
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
import { tagsService } from '../services/TagsService';
import { useRouter } from 'vue-router';


export default {
  setup() {
    const router = useRouter()
    onMounted(() => {
      getTopics()
      getTags()
    })
    async function getTopic(id) {
      try {
        router.push(`topics/${id}`)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getTopics() {
      try {
        const topics = await topicsService.getTopics()
        getTopicTagsForTopic()
        return topics
      } catch (error) {
        Pop.error
      }
    }
    async function getTags() {
      try {
        const tags = await tagsService.getTags()
        return tags
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getTopicTagsForTopic() {
      try {
        const topicTags = await topicsService.getTopicTagsForTopic()
        return topicTags
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      topics: computed(() => AppState.topics),
      tags: computed(() => AppState.tags),
      getTopic
    }
  }
}
</script>

<style scoped lang="scss">
.tag {
  border-radius: 10px;
  box-shadow: 0px 0px 10px white;
  width: 100px;
  height: 100px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 16px;
  text-align: center;
}

.tag-top {
  background-color: black;
  color: white;
  height: 70%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: xxx-large;
}

.tag-bot {
  background-color: white;
  color: black;
  height: 30%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.topic-card {
  width: 300px;
  height: 300px;
  margin-top: 25px;
  margin-bottom: 25px;
  margin-right: 25px;
  margin-left: 25px;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0px 0px 15px -2px white;

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
  border: 1px solid rgb(0, 0, 0);
  color: white;
  overflow: hidden;
  // box-shadow: inset 0px 0px 15px 0px white;
}
</style>