import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService{
    async getCommentsForDiscussion(id) {
        const res = await api.get(`api/discussions/${id}/comments`)
        logger.log('Got all comments for discussion:', res.data)
        const dis = AppState.discussions.find(dis=> dis.id = id)
        dis.comments = res.data
    }
    async createComment(commentData) {
        try {
            if(!AppState.account.id){ Pop.error('Please log in to create a new Comment')
            return
        }
            const res = await api.post('api/comments', commentData)
            Pop.success('You just Commented')
            logger.log('comment data:', res.data)
            const discussion = AppState.discussions.find(dis=> dis.id == commentData.discussionId)
            discussion.comments.push(new Comment(res.data))
            // discussion.comments.splice(-1, 0, new Comment(res.data))
        } catch (error) {
            Pop.error(error)
        }
    }
//     async getComments(id) {
//         try {
//             const res = await api.get(`api/topics/${id}/discussions/comments`)
//             logger.log('Got Comments:', res.data)
//         } catch (error) {
//             Pop.error(error)
//         }
//     }
}
export const commentsService = new CommentsService()