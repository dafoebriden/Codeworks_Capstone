import { Schema } from "mongoose";

export const TagsSchema = new Schema(
    {
        name: { type: String, minlength: 1, maxlength: 15, required: true },
        emoji: { type: String, minlength: 1, maxlength: 2, required: true },
        accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
        // topicId: { type: Schema.ObjectId, ref: 'Topic', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)
