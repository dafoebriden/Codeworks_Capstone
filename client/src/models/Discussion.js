export class Discussion{
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.picture = data.picture
        this.description = data.description
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.creatorId = data.creatorId
        this.topicId = data.topicId
        
    }
}