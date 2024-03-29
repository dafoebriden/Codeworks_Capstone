import { dbContext } from "../db/DbContext.js"

class RepliesService {
    async createReply(data) {
        const reply = await dbContext.Replies.create(data)
        return reply

    }
}
export const repliesService = new RepliesService()