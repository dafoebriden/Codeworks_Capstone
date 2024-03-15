import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TopicsSchema } from '../models/Topic.js';
import { TagsSchema } from '../models/Tag.js';
import { TopicTagsSchema } from '../models/TopicTag.js';
import { DiscussionsSchema } from '../models/Discussion.js';
import { CommentsSchema } from '../models/Comment.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Topics = mongoose.model('Topic', TopicsSchema);
  Tags = mongoose.model('Tag', TagsSchema);
  TopicTags = mongoose.model('TopicTag', TopicTagsSchema);
  Discussions = mongoose.model('Discussion', DiscussionsSchema);
  Comments = mongoose.model('Comment', CommentsSchema);
}

export const dbContext = new DbContext()
