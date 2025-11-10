import { useState, useMemo } from 'react';

interface UseTableProps {
  defaultDense?: boolean;
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: number[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
}

export function useTable({
  defaultDense = false,
  defaultOrder = 'asc',
  defaultOrderBy = 'name',
  defaultSelected = [],
  defaultRowsPerPage = 5,
  defaultCurrentPage = 0,
}: UseTableProps = {}) {
  const [dense, setDense] = useState(defaultDense);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder);
  const [selected, setSelected] = useState(defaultSelected);
  const [page, setPage] = useState(defaultCurrentPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const onSort = (id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const onSelectRow = (id: number) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const onSelectAllRows = (checked: boolean) => {
    if (checked) {
      // const newSelected = dataInPage.map((row) => row.id);
      // setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeDense = (checked: boolean) => {
    setDense(checked);
  };

  return {
    dense,
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    //
    onSort,
    onSelectRow,
    onSelectAllRows,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    //
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage,
  };
}