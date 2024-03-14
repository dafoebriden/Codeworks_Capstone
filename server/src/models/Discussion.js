import { Schema } from "mongoose";

export const DiscussionsSchema = new Schema(
    {
        name: { type: String, minlength: 1, maxlength: 50, required: true },
        picture: { type: String, minlength: 1, maxlength: 1000, required: true },
        description: { type: String, minlength: 5, maxlength: 5000, required: true },
        creatorId: { type: Schema.ObjectId, ref: 'Profile', required: true },
        topicId: { type: Schema.ObjectId, ref: 'Topic', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)
DiscussionsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})