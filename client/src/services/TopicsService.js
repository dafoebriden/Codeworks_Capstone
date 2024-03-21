// import { AppState } from "../AppState"
import { AppState } from "../AppState"
import { Topic } from "../models/Topic"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TopicsService{
    async createTopic(topicData) {
            if(!AppState.account.id){ Pop.error('Please log in to create a new Topic')
            return
    }
    const res = await api.post('api/topics', topicData)
    Pop.success('You just created a new Topic!')
    logger.log('Created Topic', res.data)
}
    async deleteTopic(id) {
            if(!AppState.account.id){Pop.error('Thats not yours, give it back you thief')
                return
            } 
            const wantsToDelete = await Pop.confirm('Are you sure you want to delete this Topic?')
            if(!wantsToDelete){
                return
            }
            const res = await api.delete(`api/topics/${id}`)
            logger.log('Deleted Topic:', res.data.title)
            const topic = AppState.discussions.findIndex(t=> t.id == id)
            AppState.topics.splice(topic, 1)
}
    async getTopic(id) {
            AppState.activeTopic = null
            const res = await api.get(`api/topics/${id}`)
            logger.log('Got Topic:', res.data)
            AppState.activeTopic = new Topic(res.data)
    }
    async getTopics(tagObjects, query) {
        AppState.topics = []
        const tags = tagObjects.value.map(tagObj => tagObj.id)
        query.tags = tags
        const res = await api.get('api/topics', {params: query})
        logger.log('Got Topics:', res.data)
        AppState.topics = res.data.topics.map(t=> new Topic(t))
}
}
export const topicsService = new TopicsService()