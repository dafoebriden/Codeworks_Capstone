import { AppState } from "../AppState"
import { TopicTag } from "../models/TopicTag"
import { api } from "./AxiosService"

class TopicTagsService{
async getTopicTags(tagObjects){
    const tags = tagObjects.map(tagObj => tagObj.id)
    const res = await api.get('api/topicTags', {params: {tags: tags }})
    AppState.topicTags = res.data.topicTags.map(t=> new TopicTag(t))
    // AppState.topicTags = res.data.topicTags.map(t=> new TopicTag(t))
    // const ts = AppState.topicTags.filter(t => t)
    // AppState.topics = await new Map([
    //     ...ts.map((t)=> [t.topic, t.tag])
    // ])
}
}
export const topicTagsService = new TopicTagsService()