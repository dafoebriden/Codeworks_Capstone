import { AppState } from "../AppState"
import { TopicTag } from "../models/TopicTag"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TopicTagsService{
async getTopicTags(tagObjects){
    const tags = tagObjects.map(tagObj => tagObj.id)
    const res = await api.get('api/topicTags', {params: {tags: tags }})
    logger.log('Got topicsTags:', res.data)
    // AppState.topicTags = res.data.map(t=> new TopicTag(t))
    // const ts = AppState.topicTags.filter(t => t)
    // AppState.topics = await  new Map([
    //     ...ts.map((t)=> [t.topic, t.tag]).map
    // ])
}
}
export const topicTagsService = new TopicTagsService()