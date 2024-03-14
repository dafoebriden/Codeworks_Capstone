import { dbContext } from "../db/DbContext.js"

class TagsService {


    async getTags() {
        const tags = await dbContext.Tags.find()
        return tags
    }
    async createTag(tagData) {
        const tag = await dbContext.Tags.create(tagData)
        return tag
    }
    async deleteTag(id) {
        const tag = await dbContext.Tags.findByIdAndDelete(id)
        return `Deleted Tag: ${tag}`
    }
}

export const tagsService = new TagsService()