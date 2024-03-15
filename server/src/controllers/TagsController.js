import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tagsService } from "../services/TagsService.js";
import { topicTagsService } from "../services/TopicTagsService.js";

export class TagsController extends BaseController {
    constructor() {
        super('api/tags')
        this.router
            .get('', this.getTags)
            .get('/:id/topicTags', this.getTopicTagsByTag)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTag)
            .delete('/:id', this.deleteTag)
    }
    async getTags(req, res, next) {
        const tags = await tagsService.getTags(req.query)
        res.send(tags)
    }
    async getTopicTagsByTag(req, res, next) {
        try {
            const topicTags = await topicTagsService.getTopicTagsByTag(req.params.id)
            res.send(topicTags)
        } catch (error) {
            next(error)
        }
    }
    async createTag(req, res, next) {
        try {
            const tagData = req.body
            tagData.creatorId = req.userInfo.id
            const tag = await tagsService.createTag(tagData)
            res.send(tag)
        } catch (error) {
            next(error)
        }
    }
    async deleteTag(req, res, next) {
        try {
            const tag = await tagsService.deleteTag(req.params.id, req.userInfo.id)
            res.send(tag)
        } catch (error) {
            next(error)
        }
    }
}