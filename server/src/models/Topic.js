import { Schema } from "mongoose";

export const TopicsSchema = new Schema(
    {
        name: { type: String, minlength: 1, maxlength: 50, required: true },
        picture: { type: String, minlength: 1, maxlength: 1000, required: true },
        description: { type: String, minlength: 5, maxlength: 5000, required: true },
        accountId: { type: Schema.ObjectId, ref: 'Account', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)
TopicsSchema.virtual('topicTag', {
    localField: '_id',
    foreignField: '_id',
    justOne: false,
    ref: 'Tags'
})
