import { dbContext } from "../db/DbContext.js"

class TopicTagsService {
    async createTopicTag(data) {
        const topicTag = await dbContext.TopicTags.create(data)
        return topicTag
    }
    // NOTE getting all the tags that are related to a topic
    async getTopicTagsByTopic(topicId) {
        const topicTags = await dbContext.TopicTags.find({ topicId }).populate('tag')
        return topicTags
    }
    // NOTE getting all the topics that are related to a tag
    async getTopicTagsByTag(tagId) {
        const topicTags = await dbContext.TopicTags.find({ tagId }).populate('topic')
        return topicTags
    }
}

export const topicTagsService = new TopicTagsService()