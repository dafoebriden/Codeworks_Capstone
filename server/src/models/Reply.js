import { Mongoose, Schema } from "mongoose";

export const RepliesSchema = new Schema(
    {
        body: { type: String, minlength: 1, maxlength: 5000, required: true },
        picture: { type: String, maxlength: 1000 },
        creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
        commentId: { type: Schema.ObjectId, ref: 'Comment', required: true },
        likes: [],
        thumbsDown: [],
        thumbsUp: []
    }, { timestamps: true, toJSON: { virtuals: true } }
)
RepliesSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})