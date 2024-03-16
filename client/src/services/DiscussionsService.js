import { AppState } from "../AppState"
import { Discussion } from "../models/Discussion"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class DiscussionsService{
    async getDiscussions(id) {
        try {
            const res = await api.get(`api/topics/${id}/discussions`)
            logger.log('Got discussions:', res.data)
            AppState.discussions = res.data.discussions.map(d=> new Discussion(d))
        } catch (error) {
            Pop.error(error)
        }
    }
}
export const discussionsService = new DiscussionsService()