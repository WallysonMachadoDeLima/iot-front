'use Cliente';

import { IPaginatedResponseDto } from '@/domain/dtos';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export interface IUseTableApiDto<T, IExtra> {
  response?: IPaginatedResponseDto<any>;
  confirm?: boolean;
  currentRow?: T;
  dataTable?: T[];
  dense?: boolean;
  direction?: string;
  linesPerPage?: number;
  loading?: boolean;
  page?: number;
  search?: string;
  tab?: any;
  totalPages?: number;
  totalElements?: number;
  orderBy?: string;
  extra?: IExtra;
}

export function useTableApi<T, IExtra = {}>(defultValue = {} as IUseTableApiDto<T, IExtra>) {
  const defaultValues = useMemo(
    () => ({
      response: defultValue.response || null,
      confirm: defultValue.confirm || false,
      currentRow: defultValue.currentRow || ({} as T),
      dataTable: defultValue.dataTable || ([] as T[]),
      dense: defultValue.dense || true,
      direction: defultValue.direction || 'DESC',
      linesPerPage: defultValue.linesPerPage || 25,
      loading: defultValue.loading || false,
      page: defultValue.page || 1,
      search: defultValue.search || '',
      tab: defultValue?.tab?.toString()?.toLocaleLowerCase() || 'all',
      totalPages: defultValue.totalPages || 0,
      totalElements: defultValue.totalElements || 0,
      type: 'api',
      orderBy: defultValue.orderBy || 'id',
      extra: defultValue.extra || ({} as IExtra),
    }),
    [],
  );

  const methods = useForm({
    defaultValues,
  });

  const { setValue, watch } = methods;
  const { response, linesPerPage, page, search, tab } = watch();

  const prevLinesPerPageRef = useRef(linesPerPage);
  const prevSearchRef = useRef(search);
  const prevTabRef = useRef(tab);
  const prevPageRef = useRef(page);

  const returnFirstPage = () => {
    const prevLinesPerPage = prevLinesPerPageRef.current;
    const prevSearch = prevSearchRef.current;
    const prevTab = prevTabRef.current;
    const prevPage = prevPageRef.current;

    const linesPerPageChanged = prevLinesPerPage !== linesPerPage;
    const searchChanged = prevSearch !== search;
    const tabChanged = prevTab !== tab;
    const pageChanged = prevPage !== page;

    // Update refs after comparison
    prevLinesPerPageRef.current = linesPerPage;
    prevSearchRef.current = search;
    prevTabRef.current = tab;
    prevPageRef.current = page;

    // Skip initial render
    if (
      prevLinesPerPage === undefined ||
      prevSearch === undefined ||
      prevTab === undefined ||
      prevPage === undefined
    ) {
      return;
    }

    if (linesPerPageChanged || searchChanged || tabChanged) {
      setValue('page', 1);
      return 1;
    } else if (pageChanged) {
      return page;
    }
  };

  useEffect(() => {
    setValue('totalPages', response?.page?.totalPages as any);
    setValue('totalElements', response?.page?.totalElements as any);
    setValue('dataTable', response?.content as any);
  }, [response]);

  useEffect(() => {
    returnFirstPage();
  }, [linesPerPage, page, search, tab]);

  return {
    methods,
  };
}
