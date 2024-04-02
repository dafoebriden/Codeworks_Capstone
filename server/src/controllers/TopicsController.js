import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { topicsService } from "../services/TopicsService.js";
import { topicTagsService } from "../services/TopicTagsService.js";
import { discussionsService } from "../services/DiscussionsService.js";
import { commentsService } from "../services/CommentsService.js";
import { logger } from "../utils/Logger.js";

export class TopicsController extends BaseController {
    constructor() {
        super('api/topics')
        this.router
            .get('', this.getTopics)
            .get('/:id', this.getTopic)
            // .get('/:id/topicTags', this.getTopicTagsByTopic)
            .get('/:id/discussions', this.getDiscussionsForTopic)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTopic)
            .use(Auth0Provider.hasPermissions('mod'))
            .put('/:id', this.editTopic)
            .delete('/:id', this.deleteTopic)
    }
    async createTopic(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const topic = await topicsService.createTopic(req.body)
            const topicTags = await topicTagsService.createTopicTag(topic.id, req.body.tagIds, req.userInfo.id)
            res.send(topic, topicTags)
        } catch (error) {
            next(error)
        }
    }
    async getTopic(req, res, next) {
        try {
            const topic = await topicsService.getTopic(req.params.id)
            res.send(topic)
        } catch (error) {
            next(error)
        }
    }
    async getTopics(req, res, next) {
        try {
            const topics = await topicsService.getTopics(req.query)
            res.send(topics)
        } catch (error) {
            next(error)
        }
    }
    async getDiscussionsForTopic(req, res, next) {
        try {
            req.query.topicId = req.params.id
            const dis = await discussionsService.getDiscussionsForTopic(req.query)
            res.send(dis)
        } catch (error) {
            next(error)
        }
    }
    // NOTE getting all the tags related to a topic
    // async getTopicTagsByTopic(req, res, next) {
    //     try {
    //         const topicTags = await topicTagsService.getTopicTagsByTopic(req.params.id)
    //         res.send(topicTags)
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    async editTopic(req, res, next) {
        try {
            const topic = await topicsService.editTopic(req.data, req.params.id, req.userInfo.id)
            res.send(topic)
        } catch (error) {
            next(error)
        }
    }
    async deleteTopic(req, res, next) {
        try {
            const topic = await topicsService.deleteTopic(req.params.id, req.userInfo.id)
            res.send(topic)
        } catch (error) {
            next(error)
        }
    }
}