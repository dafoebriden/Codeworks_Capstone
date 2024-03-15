// import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TopicsService{
async  getTopics() {
const res = await await api.get('api/topics')
logger.log('Got Topics:', res.data)
// AppState.

}

}
export const topicsService = new TopicsService()