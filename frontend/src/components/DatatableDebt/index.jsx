import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setListAsync,
  setPage,
  setLimit,
  setSort,
  setOrder,
  setFilterText,
} from '../../store/ducks/debtSlice'
import { moneyFormat } from '../../utils/format'
import DataTable from 'react-data-table-component'
import { ClearButton, TextField } from './styles'

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
  },
  {
    name: 'Desde',
    selector: 'date',
    sortable: true,
    cell: row => row.date
  }
]

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filtrar pelo nome"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>X</ClearButton>
  </>
);

const DatatableDebt = () => {
  const dispatch = useDispatch()
  const filterText = useSelector(state => state.debt.filterText)
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

    const sort = mapSort[column.selector] || column.selector

    dispatch(setSort(sort))
    dispatch(setOrder(sortDirection.toUpperCase()))
    dispatch(setListAsync())
  })

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        dispatch(setPage(1))
        dispatch(setFilterText(''))
        dispatch(setListAsync())
      }
    };

    return <FilterComponent
      onFilter={e => {
        dispatch(setFilterText(e.target.value))
        dispatch(setListAsync())
      }}
      onClear={handleClear}
      filterText={filterText}
    />;
  }, [filterText]);

  useEffect(() => {
    dispatch(setListAsync())
  }, [dispatch])

  return (
    <DataTable
      title="Lista de inadimplentes"
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
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
