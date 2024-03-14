import { Schema } from "mongoose";

export const TagsSchema = new Schema(
    {
        name: { type: String, minlength: 1, maxlength: 15, required: true },
        emoji: { type: String, minlength: 1, maxlength: 2, required: true },
        creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
        // topicId: { type: Schema.ObjectId, ref: 'Topic', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)
TagsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})
export class TagQuery {
    constructor(queryObject) {
        this.name = new RegExp(queryObject.name, 'ig')
        this.emoji = new RegExp(queryObject.description, 'ig')
    }
}