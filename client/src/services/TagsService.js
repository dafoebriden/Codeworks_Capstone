import { AppState } from "../AppState"
import { Tag } from "../models/Tag"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TagsService{
    
    async createTag(tagData) {
        try {
            if(!AppState.account.id){ Pop.error('Please log in to create a new Tag')
                return
                }
            const res = await api.post('api/tags', tagData)
            Pop.success('You just created a new Tag!')
            logger.log('Created Tag', res.data)
        } catch (error) {
            Pop.error(error)
        }
    }
    async deleteTag(id) {
        try {
            if(!AppState.account.id){Pop.error('Thats not yours, give it back you thief')
                return
            } 
            const wantsToDelete = await Pop.confirm('Are you sure you want to delete this Tag?')
            if(!wantsToDelete){
                return
            }
            const res = await api.delete(`api/tags/${id}`)
            logger.log('Deleted Tag:', res.data.name)
            const topic = AppState.tags.findIndex(t=> t.id == id)
            AppState.tags.splice(topic, 1)
        } catch (error) {
                Pop.error(error)
        }
    }
    getTagsForTopic(id) {
        throw new Error('Method not implemented.')
    }
    getTag() {
    }
    async getTags(){
        try {
            const res = await api.get('api/tags')
        logger.log('Got Tags:', res.data)
        AppState.tags = res.data.tags.map(t=> new Tag(t))
        } catch (error) {
            Pop.error(error)
        }
    }
}
export const tagsService = new TagsService()