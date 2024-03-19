import { dbContext } from "../db/DbContext.js"
import { TopicQuery } from "../models/Topic.js"
import { Forbidden } from "../utils/Errors.js"

class TopicsService {

    async createTopic(topicData) {
        const topic = await dbContext.Topics.create(topicData)
        return topic
    }
    async getTopics(query) {
        const pageNumber = parseInt(query.page) || 1
        const topicLimit = 10
        const skipNumber = (pageNumber - 1) * topicLimit
        const topicQuery = new TopicQuery(query)
        const topics = await dbContext.Topics
            .find(topicQuery)
            .limit(topicLimit)
            .skip(skipNumber)
            .populate({
                path: 'topicTags',
                populate: {
                    path: 'tag',

                },
            })
        // .populate('discussions')
        // .sort({ fireCount: 'decending' })

        const topicCount = await dbContext.Topics.countDocuments(topicQuery)
        const responseObject = {
            topics: topics,
            page: pageNumber,
            count: topicCount,
            totalPages: Math.ceil(topicCount / 10)
        }
        return responseObject
    }
    async getTopic(id) {
        const topic = await dbContext.Topics.findById(id)
            .populate({
                path: 'topicTags',
                populate: {
                    path: 'tag'
                }
            })
            .populate('creator')
        return topic
    }
    async editTopic(topicData, id, accountId) {
        const topic = await this.getTopic(id)
        if (!topic) { throw new Error(`no topic with the Id: ${id}`) }
        if (topic.creatorId != accountId) { throw new Forbidden(`That's not yours, give it back you thief!`) }
        topic.title = topicData.name || topic.title
        topic.quote = topicData.quote || topic.quote
        topic.picture = topicData.picture || topic.picture
        await topic.save()
        return topic
    }
    async deleteTopic(id, accountId) {
        const topic = await this.getTopic(id)
        if (!topic) { throw new Error(`Can't find Tag: ${topic.title}`) }
        if (accountId != topic.creatorId) { throw new Forbidden('Thats not yours!') }
        // NOTE finding all the discussions related to the topic
        // let topicId = topic.id
        // const dis = await dbContext.Discussions.find({ topicId })
        // dis.forEach(dis => {
        //     let discussionId = dis.id
        //     dbContext.Comments.findByIdAndDelete({ discussionId })
        // })
        // await dbContext.Discussions.findByIdAndDelete({ topicId })
        await dbContext.Topics.findByIdAndDelete(topic.id)
        return `Deleted Topic: ${topic.title}`
    }
}

export const topicsService = new TopicsService()