export class Comment{
    constructor(data){
        this.id = data.id
        this.body = data.body
        this.picture = data.picture
        this.creatorId = data.creatorId
        this.discussionId = data.discussionId
        this.creator = data.creator
        this.likes = data.likes
        this.thumbsDown = data.thumbsDown
        this.thumbsUp = data.thumbsUp
        this.replies = data.replies
        this.open = data.open || false
    }
}