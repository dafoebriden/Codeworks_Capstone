import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService{
    async createComment(commentData) {
        try {
            const res = await api.post('api/comments', commentData)
            logger.log('Created Comment', res.data)
            AppState.comments.push(new Comment(res.data))
        } catch (error) {
            Pop.error(error)
        }
    }
    async getComments(id) {
        try {
            const res = await api.get(`api/topics/${id}/discussions/comments`)
            logger.log('Got Comments:', res.data)
        } catch (error) {
            Pop.error(error)
        }
    }
}
export const commentsService = new CommentsService()