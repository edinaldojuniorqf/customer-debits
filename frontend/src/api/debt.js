import axios from './axios';
import { getOffset } from '../utils/pagination'

export default {
  list: ({ page, limit, sort, order, q }) =>  {
    const offset = getOffset(page, limit)
    return axios.get(
      `/debt?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&q=${q}`
    )
  },
}
