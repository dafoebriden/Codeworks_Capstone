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
            .use(Auth0Provider.hasPermissions('mod'))
            .use(Auth0Provider.hasPermissions('Full Control'))
            .delete('/:id', this.deleteTag)
    }
    async createTag(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const tag = await tagsService.createTag(req.body)
            res.send(tag)
        } catch (error) {
            next(error)
        }
    }
    async getTags(req, res, next) {
        try {
            const tags = await tagsService.getTags(req.query)
            res.send(tags)
        } catch (error) {
            next(error)
        }

    }
    // NOTE getting all the topics related to a tag
    async getTopicTagsByTag(req, res, next) {
        try {
            const topicTags = await topicTagsService.getTopicTagsByTag(req.params.id)
            res.send(topicTags)
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