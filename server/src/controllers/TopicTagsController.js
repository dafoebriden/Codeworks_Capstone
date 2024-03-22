import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { topicTagsService } from "../services/TopicTagsService.js";
import { dbContext } from "../db/DbContext.js";

export class TopicTagsController extends BaseController {
    constructor() {
        super('api/topicTags')
        this.router
            .get('/:id', this.getTopicTag)
            .get('', this.getTopicTags)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTopicTag)
            .use(Auth0Provider.hasPermissions('mod'))
            .delete('/:id', this.deleteTopicTags)
    }
    async getTopicTag(req, res, next) {
        try {

            const topicTag = await topicTagsService.getTopicTag(req.params.id)
            res.send(topicTag)

        } catch (error) {
            next(error)
        }
    }
    async getTopicTags(req, res, next) {
        try {
            const topicTags = await topicTagsService.getTopicTags(req.query)
            res.send(topicTags)
        } catch (error) {
            next(error)
        }
    }
    async createTopicTag(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const topicTags = await topicTagsService.createTopicTag(req.data)
            res.send(topicTags)
        } catch (error) {
            next(error)
        }
    }
    async deleteTopicTags(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            await topicTagsService.deleteTopicTags(req.body.id)
        } catch (error) {
            next(error)
        }
    }
}