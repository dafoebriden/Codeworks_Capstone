import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { dbContext } from "../db/DbContext.js";
import { tagsService } from "../services/TagsService.js";
import { repliesService } from "../services/RepliesService.js";

export class RepliesController extends BaseController {
    constructor() {
        super('api/replies')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:id/vote', this.voteReply)
            .post('', this.createReply)
    }

    async createReply(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const reply = await repliesService.createReply(req.body)
            res.send(reply)
        } catch (error) {
            next(error)
        }
    }
    async voteReply(req, res, next) {
        try {
            req.body.userId = req.userInfo.id
            const reply = await repliesService.voteReply(req.body, req.params.id)
            res.send(reply)
        } catch (error) {
            next(error)
        }
    }
}