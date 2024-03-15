import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { topicTagsService } from "../services/TopicTagsService.js";

export class TopicTagsController extends BaseController {
    constructor() {
        super('api/topicTags')
        this.router
            .get('', this.getTopicTags)
            .use(Auth0Provider.getAuthorizedUserInfo)
    }
    async getTopicTags(req, res, next) {
        try {
            const topicTags = await topicTagsService.getTopicTags()
            res.send(topicTags)
        } catch (error) {
            next(error)
        }
    }
}