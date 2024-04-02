import { dbContext } from "../db/DbContext.js"

class RepliesService {
    async voteReply(body, id) {
        let push
        if (body.vote == 'like') { push = { likes: body.userId } }
        if (body.vote == 'thumbDown') { push = { thumbsDown: body.userId } }
        if (body.vote == 'thumbUp') { push = { thumbsUp: body.userId } }
        await dbContext.Replies.findByIdAndUpdate(id, { $pull: { likes: body.userId, thumbsDown: body.userId, thumbsUp: body.userId } })
        await dbContext.Replies.findByIdAndUpdate(id, { $push: push })
        const reply = await dbContext.Replies.findById(id).populate('creator')
        return reply
    }
    async createReply(data) {
        const reply = (await dbContext.Replies.create(data)).populate('creator')
        return reply

    }
}
export const repliesService = new RepliesService()