import { dbContext } from "../db/DbContext.js"
import { TagQuery } from "../models/Tag.js"
import { Forbidden } from "../utils/Errors.js"

class TagsService {


    async getTags(query) {
        const pageNumber = parseInt(query.page) || 1
        const tagLimit = 20
        const skipNumber = (pageNumber - 1) * tagLimit
        const tagQuery = new TagQuery(query)
        const tags = await dbContext.Tags
            .find(tagQuery)
            .limit(tagLimit)
            .skip(skipNumber)
            // .sort({ fireCount: 'decending' })
            .populate('creator')

        const tagCount = await dbContext.Tags.countDocuments(tagQuery)
        const responseObject = {
            tags: tags,
            page: pageNumber,
            count: tagCount,
            totalPages: Math.ceil(tagCount / 20)
        }
        return responseObject
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