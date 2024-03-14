import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TopicsSchema } from '../models/Topic.js';
import { TagsSchema } from '../models/Tags.js';
import { DiscussionsSchema } from '../models/Discussion.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Topics = mongoose.model('Topic', TopicsSchema);
  Tags = mongoose.model('Tag', TagsSchema);
  Discussions = mongoose.model('Discussion', DiscussionsSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
