import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setListAsync,
  setPage,
  setLimit,
  setSort,
  setOrder,
} from '../../store/ducks/debtSlice'
import { moneyFormat } from '../../utils/format'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Cliente',
    selector: 'customerName',
    sortable: true,
  },
  {
    name: 'Valor',
    selector: 'value',
    sortable: true,
    cell: row => moneyFormat(row.value)
  }
]

const DatatableDebt = () => {
  const dispatch = useDispatch()
  const debts = useSelector(state => state.debt.data)
  const isFetching = useSelector(state => state.debt.isFetching)
  const total = useSelector(state => state.debt.total)
  const page = useSelector(state => state.debt.page)

  const handlePageChange = useCallback(page => {
    dispatch(setPage(page))
    dispatch(setListAsync())
  }, [dispatch])

  const handlePerRowsChange = useCallback((limit, page) => {
    dispatch(setPage(page))
    dispatch(setLimit(limit))
    dispatch(setListAsync())
  }, [dispatch])

  const handleSort = useCallback((column, sortDirection) => {
    const mapSort = {
      'customerName': 'customer.name',
      'value': 'items.value',
    }

    const sort = mapSort[column.selector]

    dispatch(setSort(sort))
    dispatch(setOrder(sortDirection))
  })

  useEffect(() => {
    dispatch(setListAsync())
  }, [dispatch])

  return (
    <DataTable
      title="Lista de inadiplentes"
      columns={columns}
      data={debts}
      progressPending={isFetching}
      pagination
      paginationDefaultPage={page}
      paginationServer
      paginationTotalRows={total}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      onSort={handleSort}
    />
  )
}

export default DatatableDebt
