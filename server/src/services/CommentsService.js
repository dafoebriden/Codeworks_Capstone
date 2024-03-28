import { dbContext } from "../db/DbContext.js"
import { CommentQuery } from "../models/Comment.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService {
    // async getAllCommentsForTopic(topicId) {
    //     const dis = await dbContext.Discussions.find({ topicId })
    //     const comments = await dis.forEach(dis => {
    //         let discussionId = dis._id
    //         return dbContext.Comments.find({ discussionId })
    //     })
    //     return comments
    // }
    async createComment(comData) {
        const com = await dbContext.Comments.create(comData)
        return com
    }
    async getComments(query) {
        const pageNumber = parseInt(query.page) || 1
        const commentLimit = 20
        const skipNumber = (pageNumber - 1) * commentLimit
        const commentQuery = new CommentQuery(query)
        const comments = await dbContext.Comments
            .find(commentQuery)
            .limit(commentLimit)
            .skip(skipNumber)
            .sort({ updatedAt: 'descending' })
            .populate('creator')
            .populate('replies')
        const commentCount = await dbContext.Comments.countDocuments(commentQuery)
        const responseObject = {
            comments: comments,
            page: pageNumber,
            count: commentCount,
            totalPages: Math.ceil(commentCount / 20)
        }
        return responseObject
    }
    async getComment(id) {
        const com = await dbContext.Comments.findById(id).populate('creator')
        return com
    }
    async getCommentsForDiscussion(discussionId) {
        const com = await dbContext.Comments.find({ discussionId }).populate('creator').populate('replies')
        return com
    }
    async editComment(comData, id, accountId) {
        const com = await this.getComment(id)
        if (!com) { throw new Error(`no comment with the Id: ${id}`) }
        if (com.creatorId != accountId) { throw new Forbidden(`That's not yours, give it back you thief!`) }
        com.body = comData.description || com.body
        com.picture = comData.picture || com.picture
        com.likes = comData.likes || com.likes
        com.dislikes = comData.dislikes || com.dislikes
        await com.save()
        return com
    }
    async deleteComment(id, accountId) {
        const com = await this.getComment(id)
        if (!com) { throw new Error(`Can't find Comment: ${com.id}`) }
        if (accountId != com.creatorId) { throw new Forbidden('Thats not yours, give it back you thief!') }
        await dbContext.Comments.findByIdAndDelete(id)
        return `Deleted Comment: ${com}`

    }
}

export const commentsService = new CommentsService()