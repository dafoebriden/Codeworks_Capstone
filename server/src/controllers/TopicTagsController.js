import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { topicTagsService } from "../services/TopicTagsService.js";

export class TopicTagsController extends BaseController {
    constructor() {
        super('api/topicTags')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTopicTag)
            .use(Auth0Provider.hasPermissions('mod'))
            .delete('/:id', this.deleteTopicTags)
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