export class Topic{
    constructor(data){
this.id = data.id
this.title = data.title
this.picture = data.picture
this.quote = data.quote
this.creatorId = data.creatorId
this.createdAt = data.createdAt
this.updatedAt = data.updatedAt
this.creator = data.creator
this.topicTags = data.topicTags
    }
}

const topicData = {
    "_id": "65f4a0178a21dee0027eab01",
    "name": "Clouds",
    "picture": "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "quote": "Clouds come floating into my life, no longer to carry rain or usher storm, but to add color to my sunset sky.",
    "creatorId": "65e8d4d1de0c8eeb42af624d",
    "createdAt": "2024-03-15T19:23:03.590Z",
    "updatedAt": "2024-03-15T19:23:03.590Z",
    "__v": 0,
    "id": "65f4a0178a21dee0027eab01"
}