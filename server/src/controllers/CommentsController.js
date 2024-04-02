import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .get('', this.getComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:id/vote', this.voteComment)
            .post('', this.createComment)
            .use(Auth0Provider.hasPermissions('mod'))
            .put('/:id', this.editComment)
            .delete('/:id', this.deleteComment)
    }
    async getComments(req, res, next) {
        try {
            const com = await commentsService.getComments(req.query)
            res.send(com)
        } catch (error) {
            next(error)
        }
    }
    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const com = await commentsService.createComment(req.body)
            res.send(com)
        } catch (error) {
            next(error)
        }
    }
    async editComment(req, res, next) {
        try {
            const com = await commentsService.editComment(req.body, req.params.id, req.userInfo.id)
            res.send(com)
        } catch (error) {
            next(error)
        }
    }
    async voteComment(req, res, next) {
        try {
            req.body.userId = req.userInfo.id
            const com = await commentsService.voteComment(req.body, req.params.id)
            res.send(com)
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(req, res, next) {
        try {
            const com = await commentsService.deleteComment(req.params.id, req.userInfo.id)
            res.send(`Deleted Comment: ${com}`)
        } catch (error) {
            next(error)
        }
    }
}