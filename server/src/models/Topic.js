import { Schema } from "mongoose";

export const TopicsSchema = new Schema(
    {
        title: { type: String, minlength: 1, maxlength: 50, required: true },
        picture: { type: String, minlength: 1, maxlength: 1000, required: true },
        quote: { type: String, minlength: 5, maxlength: 5000, required: true },
        creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
    }, { timestamps: true, toJSON: { virtuals: true } }
)
TopicsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})




export class TopicQuery {
    constructor(queryObject) {
        this.title = new RegExp(queryObject.title, 'ig')
        this.quote = new RegExp(queryObject.quote, 'ig')
    }
}