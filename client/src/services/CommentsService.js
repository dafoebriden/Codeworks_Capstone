import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService{
    async getComments(id) {
        try {
            const res = await api.get(`api/discussions/${id}/comments`)
            logger.log('Got Comments:', res.data)
        } catch (error) {
            Pop.error(error)
        }
    }
}
export const commentsService = new CommentsService()