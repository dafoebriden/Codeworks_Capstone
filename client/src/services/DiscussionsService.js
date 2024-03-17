import { AppState } from "../AppState"
import { Discussion } from "../models/Discussion"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class DiscussionsService{
    async createDiscussion(disData) {
        try {
            if(!AppState.account.id){Pop.error('Please log in to create a discussion.') 
            return
        }
            const res = await api.post('api/discussions', disData)
            logger.log('Created Discussion', res.data)
            AppState.activeDiscussions = res.data.map(d=> new Discussion(d))
            if(res.data.id){Pop.success('You just created a new discussion!')}
        } catch (error) {
        Pop.error(error)
        
        }
    }
    async getDiscussions(id) {
        try {
            const res = await api.get(`api/topics/${id}/discussions`)
            logger.log('Got discussions:', res.data)
            AppState.activeDiscussions = res.data.map(d=> new Discussion(d))
        } catch (error) {
            Pop.error(error)
        }
    }
}
export const discussionsService = new DiscussionsService()