import { dbContext } from "../db/DbContext.js"

class TopicTagsService {
    async getTopicTagsByTopic(topicId) {
        const topicTags = await dbContext.TopicTags.find({ topicId })
        return topicTags
    }
    async getTopicTagsByTag(tagId) {
        const topicTags = await dbContext.TopicTags.find({ tagId })
        return topicTags
    }
}

export const topicTagsService = new TopicTagsService()