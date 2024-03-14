import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TopicsSchema } from '../models/Topic.js';
import { TagsSchema } from '../models/Tags.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Topics = mongoose.model('Topic', TopicsSchema)
  Tags = mongoose.model('Tags', TagsSchema)
}

export const dbContext = new DbContext()
