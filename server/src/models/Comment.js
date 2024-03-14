import { Schema } from "mongoose";

export const CommentsSchema = new Schema(
    {
        description: { type: String, minlength: 5, maxlength: 5000, required: true },
        picture: { type: String, minlength: 1, maxlength: 1000, required: true },
        creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
        discussionId: { type: Schema.ObjectId, ref: 'Discussion', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)
CommentsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
export class CommentQuery {
    constructor(queryObject) {
        this.description = new RegExp(queryObject.description, 'ig')
    }
}