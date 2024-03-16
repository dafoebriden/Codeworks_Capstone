import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Topic.js').Topic[]} */
  topics: [],

  /** @type {import('./models/Tag.js').Tag[]} */
  tags: []
})
