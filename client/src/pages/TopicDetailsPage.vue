<template>
    <div v-if="topic" class="container-fluid">
        <div class="row">
            <div class="col-12 p-0">
                <div class="topic-header-top" :style="{ backgroundImage: `url(${topic.picture})` }">
                    <i>
                        <h1 class="display-1 fw-bolder">{{ topic.title }}</h1>
                    </i>
                </div>
                <div class="topic-header-bot">
                    <i>
                        <p>{{ topic.quote }}</p>
                    </i>
                </div>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-12 d-flex justify-content-end pt-3 pe-3">
                <button type="button" class="bar-tag bg-success" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop">
                    New Discussion
                </button>
            </div>
            <div class="col-11  col-md-10 col-lg-9">
                <div v-for="discussion in discussions" :key="discussion.id" class="discussions-card">
                    <div class="discussion-header-top" :style="{ backgroundImage: `url(${discussion.picture})` }">
                    </div>
                    <div class="discussion-header-bot">
                        <h2 class="text-center">{{ discussion.title }}</h2>
                        <p>{{ discussion.description }}</p>
                    </div>
                    <div>
                        <div class="d-flex" v-for="comment in comments" :key="comment.id">
                            <img class="rounded-circle img-fluid" :src="comment.creator.picture"
                                style="height:10px; width: 10px;">
                        </div>
                    </div>
                    <div v-if="account.id">
                        <form @submit.prevent="createComment(discussion.id, commentData)"
                            class="d-flex align-items-center">
                            <div class="input-group">
                                <textarea v-model="commentData.body" type="text" rows="1"
                                    class="form-control invalid ms-2" id="body" aria-describedby="body"
                                    placeholder=" Comment" required>
                                </textarea>
                                <span class="input-group-text m-0 p-0" id="body">
                                    <div class="dropdown m-0 p-0">
                                        <button class="btn btn-secondary dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            📸
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-start p-0">
                                            <div>
                                                <input v-model="commentData.picture" type="text"
                                                    class="form-control invalid " id="picture" minlength="5"
                                                    maxlength="1000" placeholder="url" style="width: 200px;">
                                                <!-- <div id="pictureFeedback" class="invalid-feedback">
                                                    Please choose a picture.
                                                </div>
                                                <div class="valid-feedback">
                                                    Looks good!
                                                </div> -->
                                            </div>
                                        </ul>
                                    </div>
                                </span>
                            </div>
                            <button type="submit" class="bar-tag bg-success m-2">Comment
                            </button>
                        </form>
                    </div>
                    <div v-if="account.id == discussion.creatorId" class=" text-end">

                        <!-- TODO -->
                        <!-- <button @click="editDiscussion(discussion.id)" class="bar-tag bg-dark m-2">Edit
                        </button> -->
                        <button @click="deleteDiscussion(discussion.id)" class="bar-tag bg-danger m-2">Delete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
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
                            <!-- <div id="nameFeedback" class="invalid-feedback">
                                Please choose a title.
                            </div>
                            <div class="valid-feedback">
                                Looks good!
                            </div> -->
                        </div>
                        <div class="col-md-12">
                            <label for="name" class="form-label">Picture</label>
                            <input v-model="editableDiscussionData.picture" type="text" class="form-control invalid"
                                id="name" minlength="5" maxlength="1000" required>
                            <!-- <div id="nameFeedback" class="invalid-feedback">
                                Please choose a picture.
                            </div>
                            <div class="valid-feedback">
                                Looks good!
                            </div> -->
                        </div>
                        <div class="col-md-12">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="editableDiscussionData.description" type="text"
                                class="form-control invalid" id="description" aria-describedby="descriptionFeedback"
                                required></textarea>
                            <!-- <div id="descriptionFeedback" class="invalid-feedback">
                                Please provide a description.
                            </div> -->
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
import { computed, onMounted } from 'vue';
import { discussionsService } from '../services/DiscussionsService';
import { commentsService } from '../services/CommentsService';
import { topicsService } from '../services/TopicsService';
import { AppState } from '../AppState';
// import { tagsService } from '../services/TagsService';

export default {
    setup() {
        const editableDiscussionData = { title: '', picture: '', description: '' }
        const commentData = { picture: '', body: '', discussionId: '' }
        const route = useRoute()
        onMounted(() =>
            getTopic(),
        )
        async function getTopic() {
            try {
                const topic = await topicsService.getTopic(route.params.id)
                getTopicTagsForTopic()
                getDiscussions()
                getComments()
                return topic
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getTopicTagsForTopic() {
            try {
                const topicTags = await topicsService.getTopicTagsForTopic(route.params.id)
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
            commentData,
            account: computed(() => AppState.account),
            topic: computed(() => AppState.activeTopic),
            topicTags: computed(() => AppState.activeTopicTags),
            discussions: computed(() => AppState.activeDiscussions),
            comments: computed(() => AppState.comments),

            async createDiscussion(disData) {
                try {
                    disData.topicId = route.params.id
                    const dis = await discussionsService.createDiscussion(disData)
                    return dis
                } catch (error) {
                    Pop.error(error)
                }
            },
            async deleteDiscussion(id) {
                try {
                    await discussionsService.deleteDiscussion(id)
                } catch (error) {
                    Pop.error(error)
                }
            },
            async createComment(id, commentData) {
                try {
                    commentData.discussionId = id
                    const com = await commentsService.createComment(commentData)
                    return com
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
    height: 30vw;
    width: 100%;
    background-size: cover;
    background-position: center;
    box-shadow: inset 0px 0px 10px 4px black;
    display: flex;
    justify-content: center;
    align-items: top;
    color: black;
    text-shadow: 0px 0px 15px white;
}

.topic-header-bot {
    padding: 20px;
    width: 100%;
    display: flex;
    font-weight: bold;
    font-size: large;
    box-shadow: 0px 5px 10px white;
    color: white;
}

.discussions-card {
    width: 100%;
    margin-top: 100px;
    margin-bottom: 100px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    // border-bottom-right-radius: 30px;
    // border-bottom-left-radius: 30px;
    box-shadow: 0px 0px 10px white;



}

.discussion-header-top {
    height: 30vw;
    width: 100%;
    background-position: center, top;
    background-size: cover;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
}

.discussion-header-bot {
    box-shadow: 0px 5px 10px white;
    color: white;
    padding: 10px;
    margin-bottom: 20px;
}
</style>