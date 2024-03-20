<template>
  <div class="container-fluid my-2">
    <div class="row height home-page-no-scroll small-screen">
      <!-- NOTE Side-Bar -->
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
        <div class="text-end">
          <button v-if="account.id" type="button" class="bar-tag bg-success mb-4" data-bs-toggle="modal"
            data-bs-target="#newTag" style="max-width: 100px;">
            New Tag
          </button>
        </div>
        <!-- NOTE Tags -->
        <div class="d-flex flex-wrap justify-content-evenly">
          <div class="mb-3">
            <div class="mb-3 mx-2">
              <input v-model="tagSearchData" @input="lookAhead()" type="text" class="form-control"
                placeholder="Search Tags" style="max-width: 250px;">
            </div>
            <div class="d-flex" v-if="!tagSearchData">
              <div v-for="tag in selectedTags" :key="tag.id">
                <div @click="searchForTag(tag.id)" class="tag selectable" role="button">
                  <div class="tag-top">
                    <p class="m-0">{{ tag.emoji }}</p>
                  </div>
                  <div class="tag-bot">
                    <p class="m-0">{{ tag.name }}</p><button v-if="account.id" @click="deleteTag(tag.id)"
                      class="bar-tag bg-danger m-2" style="width: 25px; height: 15px;">
                    </button>
                  </div>
                </div>

              </div>
            </div>
            <div class="d-flex">
              <div v-for="tag in tagsSearch" :key="tag.id">
                <div @click="searchForTag(tag.id)" v-if="!tag.ifSelect && tagSearchData" class="tag selectable"
                  role="button">
                  <div class="tag-top">
                    <p class="m-0">{{ tag.emoji }}</p>
                  </div>
                  <div class="tag-bot">
                    <p class="m-0">{{ tag.name }}</p><button v-if="account.id" @click="deleteTag(tag.id)"
                      class="bar-tag bg-danger m-2" style="width: 25px; height: 15px;">
                    </button>
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
          <div class="col-12 text-end">
            <button v-if="account.id" type="button" class="bar-tag bg-success" data-bs-toggle="modal"
              data-bs-target="#newTopic">
              New Topic
            </button>
          </div>
          <!-- NOTE Topics -->
          <div @click="getTopic(topic.id)" class="topic-card selectable" role="button" v-for="topic in topics"
            :key="topic.id">
            <div class="topic-img" :style="{ backgroundImage: `url(${topic.picture})` }">
              <div class="d-flex">
                <div class="m-2 topic-tag " v-for="topicTag in topic.topicTags" :key="topicTag.id">
                  <div>
                    <p class="topic-tag-top m-0">{{ topicTag.tag.emoji }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="topic-card-bot">
              <div class="ms-3">
                <h1 class="mb-0">{{ topic.title }}</h1>
                <p>{{ topic.quote }}</p>
              </div>
              <div v-if="account.id == topic.creatorId" class=" text-end">
                <!-- TODO create edit function and form for topics -->
                <!-- <button @click="editTopic(topic.id)" class="bar-tag bg-dark m-2">Edit</button> -->
                <button @click="deleteTopic(topic.id)" class="bar-tag bg-danger m-2">Delete
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- NOTE Create Tag Form -->
      <div class="modal fade" id="newTag" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="newTagLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
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
                <div class="d-flex align-items-center mb-2">
                  <div class="col-md-5">
                    <label for="name" class="form-label fw-bold">Title</label>
                    <input v-model="topicData.title" type="text" class="form-control invalid" name="title" id="title"
                      minlength="2" maxlength="25" required>
                  </div>
                  <div class="d-flex">
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
                <div class="d-flex mb-2">
                  <div class="col-md-3">
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
import { computed, onMounted, ref } from 'vue';
import { topicsService } from '../services/TopicsService';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { tagsService } from '../services/TagsService';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger';
// import { discussionsService } from '../services/DiscussionsService';


export default {
  setup() {
    const tagData = ref({ name: '', emoji: '' })
    const topicData = ref({ title: '', picture: '', quote: '', tagIds: [] })
    const tagSearchData = ref('')
    const router = useRouter()
    onMounted(() => {
      getTopics()
      getTags()
    })

    async function lookAhead() {
      let value = tagSearchData.value
      let regex = new RegExp(value, 'ig')
      let choices = AppState.tags.filter(tag => tag.name.match(regex))
      AppState.tagsSearch = choices
    }
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
      selectedTags: computed(() => AppState.tags.filter(t => t.ifSelect)),
      activeTags: computed(() => AppState.activeTags),
      topicFormTags: computed(() => AppState.topicFormTags),
      tagsSearch: computed(() => AppState.tagsSearch),
      tagSearchData,
      lookAhead,
      getTopic,
      topicData,
      tagData,
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
      searchForTag(id) {
        const tag = AppState.tags.find(tag => tag.id == id)
        if (tag.ifSelect) {
          tag.ifSelect = false
          return
        }
        if (!tag.ifSelect) {
          tag.ifSelect = true
        }

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
// const typeahead = {
//   selectedIndex: -1, init: function () {
//     this.input = document.getElementById("typeahead");
//     if (!this.input) return;
//     this.resultHolder = document.getElementById("typeahead-results");
//     this.input.addEventListener("input", this.handleInput.bind(this));
//     this.input.addEventListener("keydown", this.handleKeydown.bind(this));
//   },
//   handleInput: function () {
//     this.clearResults();
//     const { value } = this.input; if (value.length < 1) return;
//     const strongMatch = new RegExp("^" + value, "i");
//     const weakMatch = new RegExp(value, "i");
//     const results = AppState.tags.filter(recipe => weakMatch.test(recipe.name)).sort((a, b) => {
//       if (strongMatch.test(a.name) && !strongMatch.test(b.name)) return -1;
//       if (!strongMatch.test(a.name) && strongMatch.test(b.name)) return 1;
//       return a.name < b.name ? -1 : 1;
//     });
//     for (const recipe of results) {
//       const item = document.createElement("li");
//       const matchedText = weakMatch.exec(recipe.name)[0];
//       item.innerHTML = recipe.name.replace(matchedText, "<strong>" + matchedText + "</strong>");
//       item.dataset.permalink = recipe.permalink;
//       this.resultHolder.appendChild(item);
//       item.addEventListener("click", this.handleClick);
//     }
//   },
//   handleClick: function () {
//     window.location.href = this.dataset.permalink;
//   },
//   getResults: function () {
//     return this.resultHolder.children;
//   },
//   clearResults: function () {
//     this.selectedIndex = -1;
//     while (this.resultHolder.firstChild) {
//       this.resultHolder.removeChild(this.resultHolder.firstChild);
//     }
//   },
//   handleKeydown: function (event) {
//     const { keyCode } = event;
//     const results = this.getResults();
//     if (keyCode === 40 && this.selectedIndex < results.length - 1) { this.selectedIndex++; }
//     else if (keyCode === 38 && this.selectedIndex >= 0) { this.selectedIndex--; }
//     else if (keyCode === 13 && results[this.selectedIndex]) { window.location.href = results[this.selectedIndex].dataset.permalink; }
//     for (let i = 0; i < results.length; i++) {
//       const result = results[i]; const selectedClass = "selected";
//       if (i === this.selectedIndex) { result.classList.add(selectedClass); }
//       else if (result.classList.contains(selectedClass)) {
//         result.classList.remove(selectedClass);
//       }
//     }
//   }
// };
// typeahead.init();
</script>

<style scoped lang="scss">
// .home-page-no-scroll {
//   overflow: hidden;
// }

.main-page {
  overflow: auto;
}

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

.form-tag {
  border-radius: 10px;
  box-shadow: 0px 0px 10px white;
  width: 70px;
  height: 70px;
  text-align: center;
  font-weight: bold;
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
}

.topic-tag {
  border-radius: 10px;
  box-shadow: 0px 0px 10px black;
  width: 30px;
  height: 30px;
  text-align: center;
  font-weight: bold;
  background-color: black;
  color: white;
  border-radius: 10px;
  font-size: large;
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
}

.tags-dropdown::-webkit-scrollbar {
  display: none;
}

.dropdown-tags {
  color: white
}

.dropdown-tags:hover {
  color: black;
  background-color: white;
}





// .typeahead {
//   position: relative;
// }

// #typeahead-results {
//   list-style: none;
//   position: absolute;
//   top: 4.5em;
//   left: 0;
//   background-color: darkblue;
//   width: 250px;
//   margin: 0 0.5em;
//   padding: 0;

//   &:empty {
//     display: none;
//   }

//   @mixin selected {
//     background-color: darkblue;
//     color: white;
//   }

//   li {
//     border-bottom: 2px solid black;
//     cursor: pointer;
//     padding: 1em;
//   }
// }</style>