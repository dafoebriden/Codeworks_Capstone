import { AppState } from "../AppState"
import { Reply } from "../models/Reply"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class RepliesService{
async createReply(data,disId){
    const res = await api.post('api/replies', data)
    logger.log(data)
    AppState.discussions.find(dis => dis.id == disId).comments.find(com=> com.id == data.commentId).replies.push(new Reply(res.data))

}
async toggleLike(data){
    const res = await api.put(`api/replies/${data.replyId}`, data)
    const repIndex = AppState.discussions.find(dis => dis.id == data.disId).comments.find(com=> com.id == data.commentId).replies.findIndex(rep=> rep.id == data.id)
    AppState.discussions.find(dis => dis.id == data.disId).comments.find(com=> com.id == data.commentId).replies.splice(repIndex, 1, new Reply(res.data))
}
}

export const repliesService = new RepliesService()