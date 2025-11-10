import { IDispositivoFindAll } from '@/models';
import { paths } from '@/routes';
import { TableCell, TableRow } from '@mui/material';
import { TableActions } from '@/components/table';

interface Props {
  row: IDispositivoFindAll;
  onDeleteRow: () => void;
  onEditRow: () => void;
  onViewRow: () => void;
}

export function DispositivoTableRow({
  row,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const { id_dispositivo, identificador, descricao, tipo, localizacao, ativo } = row;

  return (
    <TableRow hover>
      <TableCell align="center">{id_dispositivo}</TableCell>
      <TableCell align="left">{identificador}</TableCell>
      <TableCell align="left">{descricao || '-'}</TableCell>
      <TableCell align="left">{tipo}</TableCell>
      <TableCell align="left">{localizacao}</TableCell>
      <TableCell align="center">{ativo ? 'Ativo' : 'Inativo'}</TableCell>
      <TableCell align="right">
        <TableActions
          onView={onViewRow}
          onEdit={onEditRow}
          onDelete={onDeleteRow}
        />
      </TableCell>
    </TableRow>
  );
}