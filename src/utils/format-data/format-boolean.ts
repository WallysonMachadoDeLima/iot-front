export function fBoolean(value: any): boolean {
  return ['', undefined, null].includes(value) ? false : true;
}
