import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { discussionsService } from "../services/DiscussionsService.js";

export class DiscussionsController extends BaseController {
    constructor() {
        super('api/discussions')
        this.router
            .get('', this.getDiscussions)
            .get('/:id')
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createDiscussion)
            .put('/:id', this.editDiscussion)
            .delete('/:id', this.deleteDiscussion)
    }
    async getDiscussions(req, res, next) {
        try {
            const dis = await discussionsService.getDiscussions()
            res.send(dis)
        } catch (error) {
            next(error)
        }
    }
    async getDiscussion(req, res, next) {
        try {
            const dis = await discussionsService.getDiscussion(req.params.id)
            res.send(dis)
        } catch (error) {
            next(error)
        }
    }
    async createDiscussion(req, res, next) {
        try {
            req.body.creatorId = req.UserInfo.id
            const dis = await discussionsService.createDiscussion(req.body)
            res.send(dis)
        } catch (error) {
            next(error)
        }
    }
    async editDiscussion(req, res, next) {
        try {
            const dis = await discussionsService.editDiscussion(req.body, req.params.id, req.UserInfo.id)
            res.send(dis)
        } catch (error) {
            next(error)
        }
    }
    async deleteDiscussion(req, res, next) {
        try {
            const dis = await discussionsService.deleteDiscussion(req.params.id, req.UserInfo.id)
            res.send(`Deleted Discussion: ${dis.id}`)
        } catch (error) {
            next(error)
        }
    }
}