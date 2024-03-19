import { Schema } from "mongoose";

export const TopicTagsSchema = new Schema(
    {
        creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
        topicId: { type: Schema.ObjectId, ref: 'Topic', required: true },
        tagId: { type: Schema.ObjectId, ref: 'Tag', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)

TopicTagsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})
TopicTagsSchema.virtual('topic', {
    localField: 'topicId',
    foreignField: '_id',
    ref: 'Topic'
})
TopicTagsSchema.virtual('tag', {
    localField: 'tagId',
    foreignField: '_id',
    justOne: true,
    ref: 'Tag'
})