<template>
    <div v-if="topic" class="container-fluid">
        <div class="row">
            <div class="col-12 p-0">
                <div class="topic-header-top img-fluid" :style="{ backgroundImage: `url(${topic.picture})` }">
                    <i>
                        <h1 class="display-1 fw-bolder">{{ topic.name }}</h1>
                    </i>
                </div>
                <div class="topic-header-bot">
                    <i>
                        <p>{{ topic.quote }}</p>
                    </i>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-end p-3">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    New Discussion
                </button>

            </div>

        </div>
    </div>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">New Discussion</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="createDiscussion(editableDiscussionData)">
                        <div class="col-md-6">
                            <label for="name" class="form-label">Title</label>
                            <input v-model="editableDiscussionData.title" type="text" class="form-control invalid"
                                id="name" minlength="2" maxlength="25" required>
                            <div id="nameFeedback" class="invalid-feedback">
                                Please choose a title.
                            </div>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label for="name" class="form-label">Picture</label>
                            <input v-model="editableDiscussionData.picture" type="text" class="form-control invalid"
                                id="name" minlength="5" maxlength="1000" required>
                            <div id="nameFeedback" class="invalid-feedback">
                                Please choose a picture.
                            </div>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="editableDiscussionData.description" type="text"
                                class="form-control invalid" id="description" aria-describedby="descriptionFeedback"
                                required></textarea>
                            <div id="descriptionFeedback" class="invalid-feedback">
                                Please provide a description.
                            </div>
                        </div>
                        <div class="d-flex justify-content-end pt-3">
                            <button class="btn btn-primary" type="submit">Create Discussion</button>
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
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { computed, onMounted, ref } from 'vue';
import { discussionsService } from '../services/DiscussionsService';
import { commentsService } from '../services/CommentsService';
import { topicsService } from '../services/TopicsService';
import { AppState } from '../AppState';

export default {
    setup() {
        const editableDiscussionData = ref({ title: '', picture: '', description: '' })
        const route = useRoute()
        onMounted(() =>
            getTopic(),
            // getComments()
        )
        async function getTopic() {
            try {

                const topic = await topicsService.getTopic(route.params.id)
                getTopicTags()
                getDiscussions()
                // getComments()
                return topic

            } catch (error) {
                Pop.error(error)
            }
        }
        async function getTopicTags() {
            try {
                const topicTags = await topicsService.getTopicTags(route.params.id)
                return topicTags
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getDiscussions() {
            try {
                const dis = await discussionsService.getDiscussions(route.params.id)
                return dis
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getComments(discussionId) {
            try {

                const com = await commentsService.getComments(discussionId)
                return com
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            editableDiscussionData,
            topic: computed(() => AppState.activeTopic),

            async createDiscussion(disData) {
                try {
                    disData.topicId = route.params.id
                    const dis = await discussionsService.createDiscussion(disData)
                    return dis
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.container {
    width: 100vw
}

.topic-header-top {
    padding: 0px;
    height: 30vh;
    width: 100%;
    object-fit: contain;
    object-position: center;
    box-shadow: inset 0px 0px 10px 4px black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.topic-header-bot {
    padding: 20px;
    height: 20vh;
    width: 100%;
    // box-shadow: inset 0px 0px 10px 4px black;
    display: flex;
    background-color: white;
    font-weight: bold;
    font-size: large;
}
</style>