import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class DiscussionsService {
    async getDiscussions() {
        const dis = await dbContext.Discussions.find()
        return dis
    }
    async getDiscussion(id) {
        const dis = await dbContext.Discussions.findById(id)
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
        dis.name = disData.name || dis.name
        dis.picture = disData.picture || dis.picture
        dis.description = disData.description || dis.description
        await dis.save()
        return dis
    }
    async deleteDiscussion(id, accountId) {
        const dis = await this.getDiscussion(id)
        if (!dis) { throw new Error(`Can't find Tag: ${dis.name}`) }
        if (accountId != dis.creatorId) { throw new Forbidden('Thats not yours, give it back you thief!') }
        await dbContext.Discussions.findByIdAndDelete(id)
        return `Deleted discussion: ${dis.name}`

    }
}

export const discussionsService = new DiscussionsService()