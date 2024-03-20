export class Tag{
    constructor(data){
        this.id = data.id
        this.name = data.name
        this.emoji = data.emoji
        this.accountId = data.accountId
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.creator = data.creator
        this.ifFormSelect = data.ifFormSelect || false
        this.ifSelect = data.ifSelect || false
    }
}