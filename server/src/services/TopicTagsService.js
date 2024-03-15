import { dbContext } from "../db/DbContext.js"

class TopicTagsService {
    async createTopicTag(data) {
        const topicTag = await dbContext.TopicTags.create(data)
        return topicTag
    }
    async getTopicTagsByTopic(topicId) {
        const topicTags = await dbContext.TopicTags.find({ topicId }).populate('tag')
        return topicTags
    }
    async getTopicTagsByTag(tagId) {
        const topicTags = await dbContext.TopicTags.find({ tagId }).populate('topic')
        return topicTags
    }
}

export const topicTagsService = new TopicTagsService()