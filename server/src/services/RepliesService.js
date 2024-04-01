import { dbContext } from "../db/DbContext.js"

class RepliesService {
    async editReply(body, id) {
        let push
        if (body.vote == 'like') { push = { likes: body.userId } }
        if (body.vote == 'thumbDown') { push = { thumbsDown: body.userId } }
        if (body.vote == 'thumbUp') { push = { thumbsUp: body.userId } }
        const reply = await dbContext.Replies.findByIdAndUpdate(id, { $pull: { likes: body.userId, thumbsDown: body.userId, thumbsUp: body.userId }, $push: push })
        return reply
    }
    async createReply(data) {
        const reply = await dbContext.Replies.create(data)
        return reply

    }
}
export const repliesService = new RepliesService()