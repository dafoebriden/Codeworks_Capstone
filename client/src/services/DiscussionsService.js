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
            AppState.discussions.push(new Discussion(res.data))
            if(res.data.id){Pop.success('You just created a new discussion!')}
        } catch (error) {
        Pop.error(error)
        
        }
    }
    async deleteDiscussion(id){
            try {
                if(!AppState.account.id){Pop.error('Thats not yours, give it back you thief')
                    return
            } 
                const wantsToDelete = await Pop.confirm('Are you sure you want to delete this discussion?')
                if(!wantsToDelete){
                    return
                }
                    const res = await api.delete(`api/discussions/${id}`)
                    logger.log('Deleted discussion:', res.data.title)
                    const dis = AppState.discussions.findIndex(d=> d.id == id)
                    AppState.discussions.splice(dis, 1)
                
        } catch (error) {
            Pop.error(error)
        }
    }    
    async deleteDiscussionsForTopic(id) {
        try {
            await api.delete(`api/topic/${id}/discussions`) 
        } catch (error) {
            Pop.error(error)
        }
    }
    async getDiscussionsForTopic(query) {
        try {
            const res = await api.get(`api/discussions`, {params: query})
            logger.log('Got discussions:', res.data)
            AppState.discussions.push(res.data.map(d=> new Discussion(d)))
        } catch (error) {
            Pop.error(error)
        }
    }
}
export const discussionsService = new DiscussionsService()