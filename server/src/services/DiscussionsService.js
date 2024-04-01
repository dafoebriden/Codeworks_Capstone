import { populate } from "dotenv"
import { dbContext } from "../db/DbContext.js"
import { DiscussionQuery } from "../models/Discussion.js"
import { Forbidden } from "../utils/Errors.js"

class DiscussionsService {
    async getDiscussionsForTopic(topicId) {
        const dis = await dbContext.Discussions.find({ topicId })
            .populate('creator')
            .populate({
                path: 'comments',
                options: { sort: { 'createdAt': -1 }, limit: 3 },
                populate: { path: 'creator replies' }
            })
        return dis
    }
    async getDiscussions(query) {
        const pageNumber = parseInt(query.page) || 1
        const disLimit = 10
        const skipNumber = (pageNumber - 1) * disLimit
        const disQuery = new DiscussionQuery(query)
        const dis = await dbContext.Discussions
            .find(disQuery)
            .limit(disLimit)
            .skip(skipNumber)
            // .sort({ fireCount: 'decending' })
            .populate('creator')
            .populate({
                path: 'comments',
                options: { limit: 3 },
                populate: {
                    path: 'creator replies'
                }
            })

        const disCount = await dbContext.Discussions.countDocuments(disQuery)
        const responseObject = {
            discussions: dis,
            page: pageNumber,
            count: disCount,
            totalPages: Math.ceil(disCount / 10)
        }
        return responseObject
    }
    async getDiscussion(id) {
        const dis = await dbContext.Discussions.findById(id).populate('creator').populate('comments', 'creator body')
        return dis
    }
    async createDiscussion(disData) {

        const dis = await dbContext.Discussions.create(disData)
        return dis
    }
    async editDiscussion(disData, id, accountId) {
        const dis = await this.getDiscussion(id)
        if (!dis) { throw new Error(`no dis with the Id: ${id}`) }
        if (dis.creatorId != accountId) { throw new Forbidden(`That's not yours, give it back you thief!`) }
        dis.title = disData.title || dis.title
        dis.picture = disData.picture || dis.picture
        dis.description = disData.description || dis.description
        await dis.save()
        return dis
    }
    async deleteDiscussion(id, accountId) {
        const dis = await this.getDiscussion(id)
        if (!dis) { throw new Error(`Can't find Tag: ${dis.title}`) }
        if (accountId != dis.creatorId) { throw new Forbidden('Thats not yours, give it back you thief!') }
        await dbContext.Discussions.findByIdAndDelete(id)
        return `Deleted discussion: ${dis.title}`

    }
}

export const discussionsService = new DiscussionsService()