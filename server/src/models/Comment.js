import { Schema } from "mongoose";

export const CommentsSchema = new Schema(
    {
        body: { type: String, minlength: 1, maxlength: 5000, required: true },
        picture: { type: String, maxlength: 1000 },
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
        this.body = new RegExp(queryObject.body, 'ig')
    }
}