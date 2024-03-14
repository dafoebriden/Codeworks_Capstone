import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { topicsService } from "../services/TopicsService.js";

export class TopicsController extends BaseController {
    constructor() {
        super('api/topics')
        this.router
            .get('', this.getTopics)
            .get('/:id', this.getTopic)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTopic)
            .delete('/:id', this.deleteTopic)
    }
    async createTopic(req, res, next) {
        try {
            const topicData = req.body
            topicData.creatorId = req.userInfo.id
            const topic = await topicsService.createTopic(topicData)
            res.send(topic)
        } catch (error) {
            next(error)
        }
    }
    async getTopics(req, res, next) {
        try {
            const topics = await topicsService.getTopics()
            res.send(topics)
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
            const topic = await topicsService.deleteTopic(req.params.id)
            res.send(topic)
        } catch (error) {
            next(error)
        }
    }
}