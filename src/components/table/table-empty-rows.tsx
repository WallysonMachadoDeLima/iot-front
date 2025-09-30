import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface Props {
  emptyRows?: number;
}

export function TableEmptyRows({ emptyRows }: Props) {
  const { watch } = useFormContext();
  const { totalElements, linesPerPage, page, dense } = watch();

  const denseHeight = dense ? 52 : 72;

  const newEmptyRows = () => {
    if (emptyRows) return emptyRows;

    if (totalElements <= linesPerPage) {
      return 0;
    }
    const rowCount = Math.max(totalElements, 0);
    return linesPerPage - Math.min(linesPerPage, rowCount - (page - 1) * linesPerPage);
  };

  if (!newEmptyRows) {
    return null;
  }

  return (
    <TableRow
      sx={{
        ...(denseHeight && {
          height: denseHeight * newEmptyRows(),
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  );
}
