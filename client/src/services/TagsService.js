import { AppState } from "../AppState"
import { Tag } from "../models/Tag"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class TagsService{
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