import { createSlice } from '@reduxjs/toolkit'
import debtApi from '../../api/debt'

export const debtSlice = createSlice({
  name: 'debt',
  initialState: {
    filterText: '',
    data: [],
    page: 1,
    limit: 10,
    sort: '',
    order: 'ASC',
    total: 0,
    error: false,
    isFetching: false,
  },
  reducers: {
    setFilterText: (state, { payload }) => {
      state.filterText = payload
    },
    setList: (state, { payload }) => {
      state.data = payload.data
      state.total = payload.total
    },
    setPage: (state, { payload }) => {
      state.page = payload
    },
    setLimit: (state, { payload }) => {
      state.limit = payload
    },
    setSort: (state, { payload }) => {
      state.sort = payload
    },
    setOrder: (state, { payload }) => {
      state.order = payload
    },
    setTotal: (state, { payload }) => {
      state.total = payload
    },
    setError: (state, { payload}) => {
      state.error = payload
    },
    setIsFetching: (state, { payload }) => {
      state.isFetching = payload
    },
  }
})

export const {
  setFilterText,
  setList,
  setTotal,
  setPage,
  setSort,
  setOrder,
  setLimit,
  setError,
  setIsFetching,
} = debtSlice.actions

export const setListAsync = () => async (dispatch, getState) => {
  try {
    dispatch(setIsFetching(true))

    const { page, limit, sort, order, filterText } = getState().debt
    const response = await debtApi.list({
      page,
      limit,
      sort,
      order,
      q: filterText,
    })
    const { data: reponseData } = response
    let { data, total } = reponseData
    
    total = Number(data.total)

    dispatch(setList({ data, total }))
    dispatch(setTotal(total))
    dispatch(setError(false))
  } catch (err) {
    dispatch(setError(true))
  } finally {
    dispatch(setIsFetching(false))
  }
}

export default debtSlice.reducer
