<template>
    <div v-if="topic" class="container-fluid">
        <div class="row topic-header-top" :style="{ backgroundImage: `url(${topic.picture})` }">
            <div class="col-12 col-md-7 ">
                <div class="">
                    <i>
                        <h1 class="display-1 fw-bolder">{{ topic.title }}</h1>
                    </i>
                </div>
            </div>
            <div class="col-12 col-md-6 d-flex">
                <div class="m-3 form-tag" v-for="topicTag in topic.topicTags" :key="topicTag.id">
                    <div>
                        <p class="form-tag-top m-0">{{ topicTag.tag.emoji }}</p>
                        <p class="form-tag-bot m-0">{{ topicTag.tag.name }}</p>
                    </div>
                </div>
            </div>
            <div class=" col-12 topic-header-bot">
                <i>
                    <p>{{ topic.quote }}</p>
                </i>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="col-12 d-flex justify-content-end pt-3 pe-3">
                <button v-if="account.id" type="button" class="bar-tag bg-success" data-bs-toggle="modal"
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
                        <div class="d-flex align-items-center m-2" v-for="comment in discussion.comments"
                            :key="comment.id">
                            <div>
                                <img class="rounded-circle img-fluid" :src="comment.creator.picture"
                                    style="height:25px; width: 25px;">
                            </div>
                            <div class=" ms-2 comment-body d-flex flex-wrap">
                                <p class="m-0">{{ comment.body }}</p>
                                <div v-if="comment.picture" class="comment-picture">
                                    <img class="img-fluid" :src="comment.picture">
                                </div>
                            </div>
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
                    <div v-if="account.id == discussion.creatorId" class=" delete-dis text-end">

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
                        </div>
                        <div class="col-md-12">
                            <label for="name" class="form-label">Picture</label>
                            <input v-model="editableDiscussionData.picture" type="text" class="form-control invalid"
                                id="name" minlength="5" maxlength="1000" required>
                        </div>
                        <div class="col-md-12">
                            <label for="description" class="form-label">Description</label>
                            <textarea v-model="editableDiscussionData.description" type="text"
                                class="form-control invalid" id="description" aria-describedby="descriptionFeedback"
                                required></textarea>
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
import { logger } from '../utils/Logger';
import { formToJSON } from 'axios';
import { reference } from '@popperjs/core';
// import { tagsService } from '../services/TagsService';

export default {
    setup() {
        const editableDiscussionData = { title: '', picture: '', description: '' }
        const commentData = { picture: '', body: '', discussionId: '' }
        const route = useRoute()
        onMounted(() => {
            getTopic()
        })
        async function getTopic() {
            try {
                const topic = await topicsService.getTopic(route.params.id)
                getDiscussions()
                return topic
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
        async function createDiscussion(disData) {
            try {
                disData.topicId = route.params.id
                const dis = await discussionsService.createDiscussion(disData)
                this.editableDiscussionData = {}
                disData = {}
                return dis
            } catch (error) {
                Pop.error(error)
            }
        }
        async function createComment(id, commentData) {
            try {
                commentData.discussionId = id
                const com = await commentsService.createComment(commentData)
                this.commentData = {}
                return com
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            editableDiscussionData,
            commentData,
            createDiscussion,
            createComment,
            account: computed(() => AppState.account),
            topic: computed(() => AppState.activeTopic),
            discussions: computed(() => AppState.discussions),
            comments: computed(() => AppState.comments),

            async deleteDiscussion(id) {
                try {
                    await discussionsService.deleteDiscussion(id)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async getCommentsForDiscussion(id) {
                try {
                    const com = await commentsService.getCommentsForDiscussion(id)
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
    min-height: 30vw;
    width: 100%;
    background-size: cover;
    background-position: center;
    box-shadow: inset 0px 0px 10px 4px black;
    display: flex;
    justify-content: space-between;
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
    border-bottom: 1px solid white;
    color: white;
}

.discussions-card {
    width: 100%;
    margin-top: 100px;
    margin-bottom: 100px;
    padding-bottom: 20px;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    box-shadow: 0px 0px 50px -10px white;
    border: 1px solid white;
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
    border-bottom: 1px solid white;
    border-top: 1px solid white;
    color: white;
    padding: 10px;
    margin-bottom: 20px;
}

.form-tag {
    border-radius: 10px;
    box-shadow: 0px 0px 10px black;
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

.comment-body {
    border: 1px solid white;
    width: 100%;
    padding: 10px;
    color: white;
    margin: 5px;
}

.comment-picture {
    max-width: 400px;
    max-height: 400px;
    margin: 0;
    padding: 0;
    border: 1px solid white;
    contain: content;
}

.delete-dis {
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    margin-right: 10px;
}
</style>