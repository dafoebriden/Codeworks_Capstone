export class Tag{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.emoji = data.emoji
        this.accountId = data.accountId
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.creator = data.creator
    }
}


const tagData = {
    "_id": "65f26b76452ba973e2bcea08",
    "name": "Test",
    "emoji": "🧪",
    "accountId": "65e8d4d1de0c8eeb42af624d",
    "createdAt": "2024-03-14T03:13:58.020Z",
    "updatedAt": "2024-03-14T03:13:58.020Z",
    "__v": 0,
    "creator": null,
    "id": "65f26b76452ba973e2bcea08"
}