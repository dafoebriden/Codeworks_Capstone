import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TagsService {


    async getTags() {
        const tags = await dbContext.Tags.find()
        return tags
    }
    async createTag(tagData) {
        const tag = await dbContext.Tags.create(tagData)
        return tag
    }
    async deleteTag(id, accountId) {
        const tag = await dbContext.Tags.findById(id)
        if (!tag) { throw new Error(`Can't find Tag: ${tag.name}`) }
        if (accountId != tag.creatorId) { throw new Forbidden('Thats not yours!') }
        await dbContext.Tags.findByIdAndDelete(tag.id)
        return `Deleted Tag: ${tag.name}`
    }
}

export const tagsService = new TagsService()