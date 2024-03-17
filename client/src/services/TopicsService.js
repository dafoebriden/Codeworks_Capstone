// import { AppState } from "../AppState"
import { AppState } from "../AppState"
import { Topic } from "../models/Topic"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TopicsService{

    async getTopic(id) {
        try {
            const res = await api.get(`api/topics/${id}`)
            logger.log('Got Topic:', res.data)
            AppState.activeTopic = new Topic(res.data)
        } catch (error) {
            Pop.error(error)
        }
    }
async getTopics() {
    try {
        const res = await api.get('api/topics')
        logger.log('Got Topics:', res.data)
        AppState.topics = res.data.topics.map(t=> new Topic(t))
    } catch (error) {
        Pop.error(error)
    }
}

    async getTopicTagsForTopic(id) {
        try {
            const res = await api.get(`api/topics/${id}/topicTags`)
            logger.log('Got TopicTags:', res.data)
        } catch (error) {
            Pop.error(error)
        }
    }
} 
// getTopicTagsForTopics(id) {
//     try {
//         const res = await api.get(`api/`)
//     } catch (error) {
//         Pop.error(error)
//     }
//   }
export const topicsService = new TopicsService()