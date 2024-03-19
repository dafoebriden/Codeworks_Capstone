export class Comment{
    constructor(data){
        this.id = data.id
        this.body = data.body
        this.picture = data.picture
        this.creatorId = data.creatorId
        this.discussionId = data.discussionId
        this.creator = data.creator
    }
}