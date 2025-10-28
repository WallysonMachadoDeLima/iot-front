import numeral from 'numeral';


export type TfNumber = 'number' | 'interger' | 'float' | 'money' | 'percentage' | 'kg' | 'bytes';

export function fNumber(type: TfNumber, value: any): number | string {
  if (value === undefined || value === null || value === '') return '';

  switch (type) {
    case 'interger':
      return fInterger(value);
    case 'number':
    case 'float':
      return fFloat(value);
    case 'money':
      return fMoney(value);
    case 'percentage':
      return fPercentage(value);
    case 'kg':
      return fKg(value);
    case 'bytes':
      return fBytes(value);
    default:
      return fFloat(value);
  }
}

function fInterger(value: any): number | string {
  return parseInt(value.toString());
}

function fFloat(value: any): number | string {
  if (value === 0) return 0;

  if (typeof value === 'string') {
    const hasLeadingZeros = /^0[0-9]/.test(value);
    value = value.replace(/,/g, '#');
    value = value.replace(/\./g, '');
    value = value.replace(/#/g, '.');

    if (hasLeadingZeros) {
      return value;
    }
  }

  return parseFloat(value);
}

function fMoney(value: any): number | string {
  if (value === 0) return '0,00';

  let stringValueM = value.toString();

  if (typeof value === 'string') {
    stringValueM = stringValueM.replace(/,/g, '.');
  }

  const floatValueM = parseFloat(stringValueM).toFixed(2);

  const partsM = floatValueM.split('.');
  const integerPartM = partsM[0];
  const decimalPartM = partsM[1];

  const formattedIntegerPartM = integerPartM.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedIntegerPartM},${decimalPartM}`;
}

function fPercentage(value: any): number | string {
  if (value === 0) return '0,00';

  let stringValueM = value.toString();

  if (typeof value === 'string') {
    stringValueM = stringValueM.replace(/,/g, '.');
  }

  const floatValueM = parseFloat(stringValueM).toFixed(2);

  const partsM = floatValueM.split('.');
  const integerPartM = partsM[0];
  const decimalPartM = partsM[1];

  const formattedIntegerPartM = integerPartM.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedIntegerPartM},${decimalPartM}`;
}

function fKg(value: any): number | string {
  if (value === 0) return '0,000';

  let stringValueK = value.toString();

  if (typeof value === 'string') {
    stringValueK = stringValueK.replace(/,/g, '.');
  }

  const floatValueK = parseFloat(stringValueK).toFixed(3);

  const partsK = floatValueK.split('.');
  const integerPartK = partsK[0];
  const decimalPartK = partsK[1];

  const formattedIntegerPartK = integerPartK.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formattedIntegerPartK},${decimalPartK}`;
}

function fBytes(value: any): number | string {
  const format = value ? numeral(value).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format: string, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
