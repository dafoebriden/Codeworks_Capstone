import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { dbContext } from "../db/DbContext.js";
import { tagsService } from "../services/TagsService.js";
import { repliesService } from "../services/RepliesService.js";

export class RepliesController extends BaseController {
    constructor() {
        super('api/replies')
        this.router
            .put('/:id', this.editReply)
            .use(Auth0Provider.getAuthorizedUserInfo)
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
    async editReply(req, res, next) {
        try {
            const reply = await repliesService.editReply(req.body, req.params.id)
            res.send(reply)
        } catch (error) {
            next(error)
        }
    }
}