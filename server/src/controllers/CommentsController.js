import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/Comments')
        this.router
            .get('', this.getComments)
            .get('/:id', this.getComment)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .put('/:id', this.editComment)
            .delete('/:id', this.deleteComment)
    }
    async getComments(req, res, next) {
        try {
            const com = await commentsService.getComment(req.query)
            res.send(com)
        } catch (error) {
            next(error)
        }
    }
    async getComment(req, res, next) {
        try {
            const com = await commentsService.getComment(req.params.id)
            res.send(com)
        } catch (error) {
            next(error)
        }
    }
    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.UserInfo.id
            const com = await commentsService.createComment(req.body)
            res.send(com)
        } catch (error) {
            next(error)
        }
    }
    async editComment(req, res, next) {
        try {
            const com = await commentsService.editComment(req.body, req.params.id, req.UserInfo.id)
            res.send(com)
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(req, res, next) {
        try {
            const com = await commentsService.deleteComment(req.params.id, req.UserInfo.id)
            res.send(`Deleted Comment: ${com}`)
        } catch (error) {
            next(error)
        }
    }
}