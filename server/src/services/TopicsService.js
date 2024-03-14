import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TopicsService {

    createTopic(topicData) {
        const topic = dbContext.Topics.create(topicData)
        return topic
    }
    async getTopics() {
        const topics = await dbContext.Topics.find().populate('topicTag')
        return topics
    }
    async getTopic(id) {
        const topic = await dbContext.Topics.find({ id })
    }
    async editTopic(topicData, id, accountId) {
        const topic = await this.getTopic(id)
        if (!topic) { throw new Error(`no topic with the Id: ${id}`) }
        if (topic.accountId != accountId) { throw new Forbidden(`That's not yours, give it back you thief!`) }
        topic.name = topicData.name || topic.name
        topic.description = topicData.description || topic.description
        topic.picture = topicData.picture || topic.picture
        await topic.save()
        return topic
    }
    async deleteTopic(id) {
        const topic = await dbContext.Topics.findByIdAndDelete(id)
        return `Deleted Topic: ${topic}`
    }
}

export const topicsService = new TopicsService()