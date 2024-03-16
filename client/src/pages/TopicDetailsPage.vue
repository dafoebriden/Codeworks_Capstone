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

export default {
    setup() {
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
            topic: computed(() => AppState.activeTopic)

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