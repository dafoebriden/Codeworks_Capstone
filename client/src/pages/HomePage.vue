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
          <div class="col-12 text-end">
            <button type="button" class="bar-tag bg-success" data-bs-toggle="modal" data-bs-target="#newTopic">
              New Topic
            </button>
          </div>
          <div @click="getTopic(topic.id)" class="topic-card selectable" role="button" v-for="topic in topics"
            :key="topic.id">
            <div class="topic-img" :style="{ backgroundImage: `url(${topic.picture})` }"></div>
            <div class="topic-card-bot">
              <div class="ms-3">
                <h1 class="mb-0">{{ topic.title }}</h1>
                <p>{{ topic.quote }}</p>
              </div>
              <div v-if="account.id == topic.creatorId" class=" text-end">
                <button @click="deleteTopic(topic.id)" class="bar-tag bg-dark m-2">Edit
                </button>
                <button @click="deleteTopic(topic.id)" class="bar-tag bg-danger m-2">Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="newTopic" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="newTopicLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="newTopicLabel">New Topic</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createTopic(topicData)">
            <div class="col-md-6">
              <label for="name" class="form-label">Title</label>
              <input v-model="topicData.title" type="text" class="form-control invalid" name="title" id="title"
                minlength="2" maxlength="25" required>
              <div id="nameFeedback" class="invalid-feedback">
                Please choose a title.
              </div>
              <div class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="col-md-12">
              <label for="name" class="form-label">Picture</label>
              <input v-model="topicData.picture" type="text" class="form-control invalid" id="picture" name="picture"
                minlength="5" maxlength="1000" required>
              <div id="nameFeedback" class="invalid-feedback">
                Please choose a picture.
              </div>
              <div class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="col-md-12">
              <label for="quote" class="form-label">Quote</label>
              <textarea v-model="topicData.quote" type="text" class="form-control invalid" id="quote" name="quote"
                aria-describedby="quoteFeedback" minlength="15" maxlength="500" required></textarea>
              <div id="quoteFeedback" class="invalid-feedback">
                Please provide a quote.
              </div>
            </div>
            <div class="d-flex justify-content-end pt-3">
              <button class="btn btn-primary" type="submit">Create Topic</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { topicsService } from '../services/TopicsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { tagsService } from '../services/TagsService';
import { useRoute, useRouter } from 'vue-router';
// import { discussionsService } from '../services/DiscussionsService';


export default {
  setup() {
    const topicData = ref({ title: '', picture: '', quote: '' })
    // const route = useRoute()
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
        // getTopicTagsForTopic()
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
    // async function getTopicTagsForTopic() {
    //   try {
    //     const topicTags = await topicsService.getTopicTagsForTopic()
    //     return topicTags
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    return {
      account: computed(() => AppState.account),
      topics: computed(() => AppState.topics),
      tags: computed(() => AppState.tags),
      getTopic,
      topicData,
      async createTopic(topicData) {
        try {
          const topic = await topicsService.createTopic(topicData)
          return topic
        } catch (error) {
          Pop.error(error)
        }
      },
      async deleteTopic(id) {
        try {
          await topicsService.deleteTopic(id)
        } catch (error) {
          Pop.error(error)
        }
      }
      async createTag() {

      }
      // async createDiscussion(disData) {
      //           try {
      //               disData.topicId = route.params.id
      //               const dis = await discussionsService.createDiscussion(disData)
      //               return dis
      //           } catch (error) {
      //               Pop.error(error)
      //           }
      //       }
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