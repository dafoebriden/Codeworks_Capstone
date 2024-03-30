<template>
    <div v-if="topic" class="container-fluid">
        <div class="row topic-header-top" :style="{ backgroundImage: `url(${topic.picture})` }">
            <div class="col-8 ">
                <div class="">
                    <i>
                        <h1 class="display-1 fw-bolder">{{ topic.title }}</h1>
                    </i>
                </div>
            </div>
            <div class="col-4 d-flex justify-content-end p-0">
                <div class="m-2 topic-tag " v-for="topicTag in topic.topicTags" :key="topicTag.id">
                    <div>
                        <p class="m-0">{{ topicTag.tag.emoji }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 topic-header-bot">
            <i>
                <p>{{ topic.quote }}</p>
            </i>
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
                            <div class=" ms-2 comment-body d-flex flex-column">
                                <p class="m-0">{{ comment.body }}</p>
                                <div v-if="comment.picture" class="comment-picture">
                                    <img class="img-fluid" :src="comment.picture">
                                </div>
                                <p class="m-0"><span :title="comment.likes || 0"><i
                                            class="mdi mdi-heart-outline"></i></span> <span
                                        :title="comment.thumbsUp || 0"><i class="mdi mdi-thumb-up-outline"></i></span>
                                    <span :title="comment.thumbsDown || 0"><i
                                            class="mdi mdi-thumb-down-outline"></i></span>
                                </p>
                                <div class="replies" v-if="comment.open">
                                    <div v-for="reply in comment.replies" :key="reply.id">
                                        <!-- <div>
                                            <img :src="reply.creator.img" style="height:15px; width: 15px;">
                                        </div> -->
                                        <div class="reply-body">
                                            <p class="m-0">{{ reply.body }}</p>
                                            <p class="m-0"><span title="{{reply.likes}} likes || 0 likes"><i
                                                        class="mdi mdi-heart-outline"></i></span> <span
                                                    :title="reply.thumbsUp || 0"><i
                                                        class="mdi mdi-thumb-up-outline"></i></span> <span
                                                    :title="reply.thumbsDown || 0"><i
                                                        class="mdi mdi-thumb-down-outline"></i></span></p>
                                        </div>


                                    </div>


                                </div>
                                <!-- NOTE reply form dropdown -->
                                <div v-if="comment.replies.length == 0 || comment.open" class="dropdown m-0 p-0">
                                    <p class="reply-button dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                        data-bs-auto-close="outside" aria-expanded="false" style="width: fit-content;">
                                        reply
                                    </p>
                                    <ul class="dropdown-menu dropdown-menu-end p-0">
                                        <div>
                                            <form @submit.prevent="createReply(replyData, comment.id, discussion.id)"
                                                class="d-flex align-items-center bg-black ps-2 m-0"
                                                style="height: fit-content; border: 1px solid white;">
                                                <div class=" input-group justify-content-end">
                                                    <textarea v-model="replyData.body" type="text" rows="1"
                                                        class=" invalid ps-2 bg-black text-white input-white no-scrollbar"
                                                        id="body" aria-describedby="body" placeholder=" Reply" required
                                                        style="border: none; border: 1px solid white;"></textarea>
                                                    <span class="input-group-text m-0 p-0 bg-black " id="body">
                                                        <div class="dropdown m-0 p-0">
                                                            <button class="form-img-dropdown" type="button"
                                                                data-bs-toggle="dropdown" aria-expanded="false"
                                                                style="padding: 2px;">
                                                                📸
                                                            </button>
                                                            <ul class="dropdown-menu dropdown-menu-start p-0">
                                                                <div>
                                                                    <input v-model="replyData.picture" type="text"
                                                                        class=" ps-2 bg-black text-white input-white invalid "
                                                                        id="picture" minlength="5" maxlength="1000"
                                                                        placeholder="url"
                                                                        style="border: none; width: 80%; border: 1px solid white;width: 200px">
                                                                </div>
                                                            </ul>
                                                        </div>
                                                    </span>
                                                </div>
                                                <button type="submit" class="bar-tag bg-success m-2">Reply
                                                </button>
                                            </form>
                                        </div>
                                    </ul>
                                </div>
                                <div v-if="comment.open" class="d-flex justify-content-end">
                                    <p @click="comment.open = false" role="button" class="m-0 text-white"
                                        style="width: fit-content;">X
                                    </p>
                                </div>
                                <!-- NOTE replies count and dropdown -->
                                <div @click="comment.open = true" v-if="comment.replies.length && !comment.open">
                                    <p class="reply-button" role="button">{{ comment.replies.length }} <span
                                            v-if="comment.replies.length == 1">reply</span><span
                                            v-if="comment.replies.length >= 2">replies</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="account.id">
                        <form @submit.prevent="createComment(discussion.id, commentData)"
                            class="d-flex align-items-center">
                            <div class="input-group justify-content-end">
                                <textarea v-model="commentData.body" type="text" rows="1"
                                    class=" invalid ps-2 bg-black text-white input-white no-scrollbar" id="body"
                                    aria-describedby="body" placeholder=" Comment" required
                                    style="border: none; width: 80%; border: 1px solid white;">
                            </textarea>
                                <span class="input-group-text m-0 p-0 bg-black " id="body">
                                    <div class="dropdown m-0 p-0">
                                        <button class="form-img-dropdown" data-bs-auto-close="outside" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false" style="padding: 2px;">
                                            📸
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-start p-0">
                                            <div>
                                                <input v-model="commentData.picture" type="text"
                                                    class=" ps-2 bg-black text-white input-white invalid " id="picture"
                                                    minlength="5" maxlength="1000" placeholder="url"
                                                    style="border: none; width: 80%; border: 1px solid white;width: 200px">
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
                    </div>
                        </button> -->
                        <button @click="deleteDiscussion(discussion.id)" class="bar-tag bg-danger m-2">Delete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- NOTE New Discussion Form Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-black text-white">
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
import { computed, onMounted, ref } from 'vue';
import { discussionsService } from '../services/DiscussionsService';
import { commentsService } from '../services/CommentsService';
import { topicsService } from '../services/TopicsService';
import { repliesService } from '../services/RepliesService';
import { AppState } from '../AppState';
// import { tagsService } from '../services/TagsService';

export default {
    setup() {
        const editableDiscussionData = ref({ title: '', picture: '', description: '' })
        const commentData = ref({ picture: '', body: '', discussionId: '' })
        const replyData = ref({ picture: '', body: '' })
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
                return dis
            } catch (error) {
                Pop.error(error)
            }
        }
        async function createComment(id, commentData) {
            try {
                commentData.discussionId = id
                const com = await commentsService.createComment(commentData)
                return com
            } catch (error) {
                Pop.error(error)
            }
        }
        async function createReply(data, commentId, disId) {
            try {
                data.commentId = commentId
                const reply = await repliesService.createReply(data, disId)
                return reply
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            editableDiscussionData,
            commentData,
            replyData,
            createDiscussion,
            createComment,
            createReply,
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
    width: 100vw;
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

.topic-tag {
    border-radius: 10px;
    box-shadow: 0px 0px 10px white;
    width: 30px;
    height: 30px;
    text-align: center;
    font-weight: bold;
    background-color: black;
    color: white;
    border-radius: 10px;
    font-size: large;
}


.comment-body {
    border: 1px solid white;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    padding-bottom: 5px;
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

.reply-button {
    margin-top: 5px;
    margin-bottom: 0px;
    font-size: x-small;
    font-style: italic;
}

.reply-button:hover {
    text-shadow: 0px 0px 5px white
}

.input-white::-webkit-input-placeholder {
    color: white;
}

.no-scrollbar::-webkit-scrollbar {
    display: none
}

.replies {
    margin-left: 20px;
}

.reply-body {
    margin-top: 5px;
    margin-bottom: 0px;
    padding-left: 3px;
    font-size: small;
    font-style: italic;
    border: 1px solid white;
}

.form-img-dropdown {
    background: black;
    border: none;
    border-radius: 5px;
}
</style>