export class Reply{
    constructor(data){
        this.id = data.id
        this.body = data.body
        this.picture = data.picture
        this.creatorId = data.creatorId
        this.commentId = data.commentId
        this.creator = data.creator
        this.likes = data.likes
        this.thumbsDown = data.thumbsDown
        this.thumbsUp = data.thumbsUp
        this.replies = data.replies
    }
}