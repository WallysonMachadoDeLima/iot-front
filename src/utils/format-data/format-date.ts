import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// ----------------------------------------------------------------------
type InputValue = Date | string | number | null | undefined;

export function fDate(
  newFormat:
    | 'dd/MM/yyyy'
    | 'yyyy-MM-dd'
    | 'HH:mm'
    | 'dd/MM/yyyy HH:mm'
    | 'dd/MM/yyyy às HH:mm'
    | 'yyyy-MM-dd HH:mm:ss'
    | "d 'de' MMMM 'de' yyyy",
  date: InputValue,
): any {
  const fm = newFormat || 'yyyy-MM-dd';

  if (newFormat === 'dd/MM/yyyy às HH:mm') {
    return `${format(new Date(date as string), 'dd/MM/yyyy')} às ${format(
      new Date(date as string),
      'HH:mm',
    )}`;
  }

  if (date === '' || date === undefined) return '';
  if (date === null) return null;

  if (date.toString().length >= 10) {
    let dx: string;

    if (date.toString().length === 10) {
      dx = `${date}T00:00:00`;
    } else if (typeof date === 'string') {
      dx = date;
    } else {
      dx = new Date(date).toISOString();
    }

    dx = dx.replace('T00:00:00', 'T04:00:00');

    return `${format(new Date(dx), fm, { locale: ptBR })}${newFormat ? '' : 'T04:00:00'}`;
  }

  return '';
}
