import App from "../App.vue"
import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService{
    async getCommentsForDiscussion(id, page) {
        let query = {}
        query.page = {page: page}
        const res = await api.get(`api/discussions/${id}/comments`, {params: query})
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
            AppState.discussions.find(dis=> dis.id == commentData.discussionId).comments.push(new Comment(res.data))
            // discussion.comments.splice(-1, 0, new Comment(res.data))
        } catch (error) {
            Pop.error(error)
        }
    }
    async toggleVote(data){
        const res = await api.put(`api/comments/${data.comId}/vote`, data)
        const comIndex = AppState.discussions.find(dis => dis.id == data.disId).comments.findIndex(com=> com.id == data.comId)
        if(comIndex == -1){
            Pop.error('Check your findIndex')
            return
        }
        AppState.discussions.find(dis => dis.id == data.disId).comments.splice(comIndex, 1, new Comment(res.data))
        
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