import { configureStore } from '@reduxjs/toolkit'
import debtReducer from './ducks/debtSlice'

export default configureStore({
  reducer: {
    debt: debtReducer,
  },
})
