export class TopicTag{
    constructor(data){
        this.id = data.id
        this.topicId = data.topicId
        this.tagId = data.tagId
        this.creator = data.creator
        this.topic = data.topic
        this.tag = data.tag
    }
}