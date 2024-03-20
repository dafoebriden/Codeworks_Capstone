import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Topic.js').Topic[]} */
  topics: [],

  /** @type {import('./models/Discussion.js').Discussion[]} */
  discussions: [],

  /** @type {import('./models/TopicTag.js').TopicTag[]} */
  topicTags: [],
  
  /** @type {import('./models/Topic.js').Topic | null} */
  activeTopic: null,

  /** @type {import('./models/Tag.js').Tag[]} */
  tags: [],

  /** @type {import('./models/Tag.js').Tag[]} */
  tagsSearch: [],

  /** @type {import('./models/Tag.js').Tag[]} */
  activeTags: [],

  /** @type {import('./models/Tag.js').Tag[]} */
  topicFormTags: [],
  
    /** @type {import('./models/Comment.js').Comment[]} */
    comments: [],

})
