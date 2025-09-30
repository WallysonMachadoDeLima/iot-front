import { SxProps, Theme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { isEqual } from 'lodash';
import { useFormContext } from 'react-hook-form';
import EmptyContent from '../empty-content';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
  title?: string;
  endTitle?: string;
  colSpan?: number;
  notFound?: boolean;
};

export function TableNoData({ colSpan = 12, sx, title, endTitle, notFound }: Props) {
  const { watch } = useFormContext();

  const { dataTableFilter, dataTable, type } = watch();

  const data = type === 'local' ? dataTableFilter : dataTable;

  const canReset = !isEqual('', '');

  const found =
    notFound !== undefined && notFound !== null
      ? notFound
      : (!data?.length && canReset) || !data?.length;

  return (
    <TableRow>
      {found ? (
        <TableCell colSpan={colSpan}>
          <EmptyContent
            filled
            title={title ? title : `Não há registros de ${endTitle ? endTitle : 'dados'}`}
            sx={{
              py: 3,
              ...sx,
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={colSpan} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
