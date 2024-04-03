<template>
  <div class="container-fluid my-2">
    <div class="row height home-page-no-scroll small-screen">
      <!-- NOTE Side-Bar -->
      <div class="col-11 col-lg-2 bar p-0 d-flex flex-column">
        <div class="d-flex justify-content-end">
          <div class=" text-end">
            <button v-if="account.id" type="button" class="bar-tag bg-success m-1" data-bs-toggle="modal"
              data-bs-target="#newTopic">
              New Topic
            </button>
          </div>
          <div class="text-end">
            <button v-if="account.id" type="button" class="bar-tag bg-success m-1" data-bs-toggle="modal"
              data-bs-target="#newTag" style="max-width: 100px;">
              New Tag
            </button>
          </div>
        </div>


        <!-- NOTE Tags -->
        <div class="d-flex flex-wrap justify-content-evenly tags-container">
          <div class="mb-3">
            <div class="m-0 input-group p-2">
              <span class="input-group-text bar-tag bg-dark me-0" id="basic-addon1">🔍</span>
              <input v-model="tagSearchData" type="text" class="form-control searchBar text-white bar-tag bg-dark"
                placeholder="Search Tags" style="max-width: 250px;">
            </div>
            <div class="d-flex tags-dropdown">
              <div @click="searchForTag(tag.id)" v-for="tag in tags" :key="tag.id" class="dropdown-tags" role="button">
                {{ tag.name }}{{ tag.emoji }}
              </div>
            </div>
            <div class="d-flex" style="flex-wrap:wrap ;">
              <div v-for="tag in activeTags" :key="tag.id">
                <div @click="deleteSearchForTag(tag.id)" class="tag selectable" role="button">
                  <div class="tag-top">
                    <p class="m-0">{{ tag.emoji }}</p>
                  </div>
                  <div class="tag-bot">
                    <p class="m-0">{{ tag.name }}</p>
                    <!-- <button v-if="" @click="deleteTag(tag.id)" class="bar-tag bg-danger m-2" style="width: 25px; height: 15px;">
                </button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- NOTE Main Page -->
      <div class="col-11 col-lg-10 ">
        <div class="row d-flex main-page justify-content-evenly">
          <!-- NOTE Topics -->
          <div @click="getTopic(topic.id)" class="topic-card selectable" role="button" v-for="topic in topics"
            :key="topic.id">
            <div class="topic-img d-flex justify-content-between" :style="{ backgroundImage: `url(${topic.picture})` }">
              <div class="d-flex">
                <div class="m-2 topic-tag " v-for="topicTag in topic.topicTags" :key="topicTag.id">
                  <div>
                    <p class="topic-tag-top m-0">{{ topicTag.tag.emoji }}</p>
                  </div>
                </div>
              </div>
              <div v-if="account.id == topic.creatorId" class=" text-end">
                <!-- TODO create edit function and form for topics -->
                <!-- <button @click="editTopic(topic.id)" class="bar-tag bg-dark m-2">Edit</button> -->
                <button @click="deleteTopic(topic.id)" class="bar-tag bg-danger m-2">Delete
                </button>
              </div>
            </div>
            <div class="topic-card-bot">
              <div class="mx-3">
                <h1 class="mb-0">{{ topic.title }}</h1>
                <p>{{ topic.quote }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- NOTE Create Tag Form -->
      <div class="modal fade" id="newTag" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="newTagLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-black text-white">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="newTagLabel">New Tag</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createTag(tagData)">
                <div class="col-md-6">
                  <label for="name" class="form-label">Title</label>
                  <input v-model="tagData.name" type="text" class="form-control invalid" name="title" id="title"
                    minlength="1" maxlength="25" required>
                  <!-- <div id="nameFeedback" class="invalid-feedback">
                Please choose a title.
              </div>
              <div class="valid-feedback">
                Looks good!
              </div> -->
                </div>
                <div class="col-md-12">
                  <label for="name" class="form-label">Emoji</label>
                  <input v-model="tagData.emoji" type="text" class="form-control invalid" id="picture" name="picture"
                    minlength="0" maxlength="2" required>
                  <!-- <div id="nameFeedback" class="invalid-feedback">
                Please choose a picture.
              </div>
              <div class="valid-feedback">
                Looks good!
              </div> -->
                </div>
                <div class="d-flex justify-content-end pt-3">
                  <button class="btn btn-primary" type="submit">Create Tag</button>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!-- NOTE Create Topic Form -->
      <div class="modal fade" id="newTopic" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="newTopicLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content model-form">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="newTopicLabel">New Topic</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createTopic(topicData)">
                <div class=" mb-2">
                  <div class="col-sm-5">
                    <label for="name" class="form-label fw-bold mb-2">Title</label>
                    <input v-model="topicData.title" type="text" class="form-control invalid" name="title" id="title"
                      minlength="2" maxlength="25" required style="min-width: 200px;">
                  </div>
                  <div class="d-flex col-sm-4">
                    <div v-for="tag in tags" :key="tag.id">
                      <div v-if="tag.ifFormSelect" @click="removeTag(tag.id)" class="ms-4 form-tag selectable"
                        role="button">
                        <p class="form-tag-top m-0">{{ tag.emoji }}</p>
                        <p class="form-tag-bot m-0">{{ tag.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- NOTE Topic Tag Data -->
                <div class="m-0 input-group p-0">
                  <span class="input-group-text bar-tag bg-dark me-0 ms-0" id="basic-addon1">🔍</span>
                  <input v-model="tagSearchData" type="text" class="form-control searchBar text-white bar-tag bg-dark"
                    placeholder="Search Tags" style="max-width: 250px;">
                </div>
                <div class="d-flex mb-2">
                  <div class="col-md-3 d-flex align-items-center">
                    <div class="dropdown">
                      <button class="form-control dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Add Tags
                      </button>
                      <ul class="dropdown-menu tags-dropdown" style="max-height: 250px; overflow: auto;">
                        <div @click="addTag(tag.id)" v-for="tag in tags" :key="tag.id" class=" p-0" href="#">
                          <div class=" dropdown-item dropdown-tags selectable" role="button" v-if="!tag.ifFormSelect">
                            {{ tag.name }}{{ tag.emoji }}
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <label for="name" class="form-label fw-bold">Picture</label>
                  <input v-model="topicData.picture" type="text" class="form-control invalid" id="picture"
                    name="picture" minlength="5" maxlength="1000" required>
                </div>
                <div class="col-md-12">
                  <label for="quote" class="form-label fw-bold">Quote</label>
                  <textarea v-model="topicData.quote" type="text" class="form-control invalid" id="quote" name="quote"
                    aria-describedby="quoteFeedback" minlength="15" maxlength="500" required></textarea>
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
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { topicsService } from '../services/TopicsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { tagsService } from '../services/TagsService';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger';


export default {
  setup() {
    const tagData = ref({ name: '', emoji: '' })
    const topicData = ref({ title: '', picture: '', quote: '', tagIds: [] })
    const tagSearchData = ref('')
    const selectedTags = computed(() => AppState.activeTags)
    const route = useRoute()
    const router = useRouter()
    onMounted(() => {
      getTopics(selectedTags)
      getTags(tagSearchData)
    })
    watch(tagSearchData, () => {
      getTags(tagSearchData)
    })
    async function getTags(tagSearchData) {
      try {
        const tags = await tagsService.getTags(tagSearchData)
        return tags
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getTopic(id) {
      try {
        router.push(`/topics/${id}/discussions`)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getTopics(selectedTags) {
      try {
        const topics = await topicsService.getTopics(selectedTags, route.query)
        return topics
      } catch (error) {
        Pop.error(error)
      }
    }
    // async function getTopicTags(selectedTags) {
    //   try {
    //     // TODO make sure to use the router to send the route to the url so the topic details page can be loaded
    //     const topicTags = await topicTagsService.getTopicTags(selectedTags.value)
    //     return topicTags
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    return {
      account: computed(() => AppState.account),
      topics: computed(() => AppState.topics),
      tags: computed(() => AppState.tags.filter(tag => !AppState.activeTags.some(t => t.id == tag.id))),
      activeTags: computed(() => AppState.activeTags),
      topicFormTags: computed(() => AppState.topicFormTags),
      getTopic,
      getTopics,
      selectedTags,
      tagSearchData,
      topicData,
      tagData,
      // SECTION Start Tags functions
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
          // await discussionsService.deleteDiscussionsForTopic(id)
        } catch (error) {
          Pop.error(error)
        }
      },
      // !SECTION end Topics functions
      // SECTION start Tags functions
      async createTag(tagData) {
        try {
          const tag = await tagsService.createTag(tagData)
          return tag
        } catch (error) {
          Pop.error(error)
        }
      },
      async deleteTag(id) {
        try {
          await tagsService.deleteTag(id)
        } catch (error) {
          Pop.error(error)
        }
      },
      // TODO make sure that all of this works properly
      addTag(id) {
        AppState.activeTags.map(tag => {
          if (tag.id == id) {
            Pop.error('You can only pick a tag once.')
            return
          }
        })
        if (AppState.activeTags.length == 3) {
          Pop.error('You can only pick up to three tags.')
          return
        }
        else {
          topicData.value.tagIds.push(id)
          AppState.tags.find(tag => tag.id == id).ifFormSelect = true
          logger.log(topicData.value.tagIds)
        }
      },
      removeTag(id) {
        AppState.tags.find(tag => tag.id == id).ifFormSelect = false
        let dataTagIndex = topicData.value.tagIds.findIndex(tagId => tagId == id)
        if (dataTagIndex == -1) return
        topicData.value.tagIds.splice(dataTagIndex, 1)
        logger.log(topicData.value.tagIds)
      },
      // TODO check if 'tag.ifSelect = !tag.ifSelect' works.
      searchForTag(id) {
        const tag = AppState.tags.find(tag => tag.id == id)
        AppState.activeTags.push(tag)
        getTopics(selectedTags)
      },
      deleteSearchForTag(id) {
        const tagIndex = AppState.activeTags.findIndex(tag => tag.id == id)
        AppState.activeTags.splice(tagIndex, 1)
        getTopics(selectedTags)
      }
    }
  }
}
// !SECTION end Tags functions
</script>

<style scoped lang="scss">
.main-font {
  font-family: "Hanalei Fill", system-ui;
  font-weight: 400;
  font-style: normal;
  text-shadow: 0px 0px 10px black;
  color: white;
}

.main-page {
  overflow-y: auto;
  overflow-x: hidden;
}

.tag {
  border-radius: 10px;
  box-shadow: 0px 0px 10px white;
  width: 55px;
  height: 55px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 16px;
  text-align: center;
}

.tag-top {
  background-color: black;
  color: white;
  height: 70%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: x-large;
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
  font-family: "Hanalei Fill", system-ui;
  font-weight: 400;
  font-size: xx-small;
}

.form-tag {
  border-radius: 10px;
  box-shadow: 0px 0px 10px white;
  width: 70px;
  height: 70px;
  text-align: center;
  font-weight: bold;
  font-family: "Hanalei Fill", system-ui;
  font-weight: 400;
  margin-top: 10px;
}

.form-tag-top {
  background-color: black;
  color: white;
  height: 65%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: xx-large;
}

.form-tag-bot {
  background-color: white;
  color: black;
  height: 35%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: x-small;
}

.topic-tag {
  border-radius: 10px;
  box-shadow: 0px 0px 10px white;
  width: 40px;
  height: 40px;
  text-align: center;
  font-weight: bold;
  background-color: black;
  color: white;
  border-radius: 10px;
  font-size: x-large;
}

.topic-card {
  width: 95%;
  height: 500px;
  margin-top: 25px;
  margin-bottom: 25px;
  margin-right: 25px;
  margin-left: 25px;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0px 0px 15px -2px white;
}

.topic-img {
  height: 65%;
  background-size: cover;
  width: 100%;
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: inset 0px 0px 50px 5px black;
}

.topic-card-bot {
  height: 35%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: black;
  border: 1px solid rgb(0, 0, 0);
  color: white;
  overflow: hidden;
  font-family: "Hanalei Fill", system-ui;
  font-weight: 400;
  overflow: auto;
}

.topic-card-bot::-webkit-scrollbar {
  display: none;
}

.model-form {
  background-color: black;
  color: white;
  box-shadow: 0px 0px 10px white;
  border: 1px solid white;
}

.tags-dropdown {
  color: white;
  background-color: black;
  box-shadow: 0px 0px 10px white;
  border: 1px solid white;
  flex-wrap: wrap;
  max-height: 250px;
}

.tags-dropdown::-webkit-scrollbar {
  display: none;
}

.dropdown-tags {
  color: white;
  font-family: "Hanalei Fill", system-ui;
  font-weight: 400;
  margin: 1px;
  padding: 2px;
  margin-left: 10px
}

.dropdown-tags:hover {
  color: black;
  text-shadow: 0px 0px 5px white;
}

.searchBar::-webkit-input-placeholder {
  color: white;
  font-style: italic;
}

@media screen and (min-width: 468px) {
  .topic-card {
    width: 90%;
  }

  .topic-img {
    height: 70%
  }

  .topic-card-bot {
    height: 30%;
  }
}

@media screen and (min-width: 676px) {
  .topic-card {
    width: 75%
  }

  .topic-img {
    height: 80%
  }

  .topic-card-bot {
    height: 20%;
  }
}

@media screen and (min-width: 676px) {
  .tags-dropdown {}

  .dropdown-tags {}
}
</style>