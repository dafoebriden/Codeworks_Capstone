import { Schema } from "mongoose";

export const TopicsSchema = new Schema(
    {
        name: { type: String, minlength: 1, maxlength: 50, required: true },
        picture: { type: String, minlength: 1, maxlength: 1000, required: true },
        description: { type: String, minlength: 5, maxlength: 5000, required: true },
        creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)
TopicsSchema.virtual('topicTag', {
    localField: '_id',
    ref: 'Tags',
    foreignField: 'Topicid',
    count: true
})
TopicsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})


export class TopicQuery {
    constructor(queryObject) {
        this.name = new RegExp(queryObject.name, 'ig')
        this.description = new RegExp(queryObject.description, 'ig')
    }
}