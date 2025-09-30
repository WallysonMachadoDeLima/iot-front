'use client';

import { useEffect } from 'react';
import { fNumber, Mask, MaskType, TfNumber } from '@/utils';
import { InputAdornment, Typography } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  mask?: keyof MaskType;
  lowerCase?: boolean;
  upperCase?: boolean;
  max?: number;
  readOnly?: boolean;
  shrink?: boolean;
  placeholder?: string;
};

const setDeep = (obj: any, path: any, value: any) => {
  const keys = path?.toString()?.split('.');
  const lastKey = keys?.pop();
  const newObj = { ...obj };
  let current = newObj;

  keys?.forEach((key: any) => {
    if (!current?.[key]) {
      (current as any)[key] = {};
    } else {
      (current as any)[key] = { ...(current as any)?.[key] };
    }
    current = current[key];
  });

  current[lastKey] = value;
  return newObj;
};

export function RHFTextField({
  name,
  helperText,
  mask,
  type,
  upperCase = false,
  lowerCase = false,
  max,
  readOnly = false,
  shrink = false,
  InputProps,
  placeholder,
  ...other
}: Props) {
  const { control, setValue, watch } = useFormContext();

  const handleInputProps = () => {
    if (!InputProps?.endAdornment) {
      switch (mask) {
        case 'money':
          return {
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body2">R$</Typography>
              </InputAdornment>
            ),
          };
        case 'percentage':
          return {
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="body2">%</Typography>
              </InputAdornment>
            ),
          };
        case 'kg':
          return {
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="body2">kg</Typography>
              </InputAdornment>
            ),
          };
        default:
          return {};
      }
    } else {
      return InputProps;
    }
  };

  const handlePlaceholder = () => {
    switch (mask) {
      case 'percentage':
        return '0';
      case 'money':
        return '0,00';
      case 'kg':
        return '0,000';
      default:
        return placeholder;
    }
  };

  const handleOnChange = (event: any, field: any) => {
    let text = event?.target?.value;

    if (upperCase) text = event?.target?.value.toUpperCase();
    if (lowerCase) text = event?.target?.value.toLowerCase();

    if (max) text = text.substring(0, max);

    field.onChange(mask ? (Mask as any)?.[mask]?.(text) : text);
  };

  useEffect(() => {
    // Não aplicar formatação inicial em campos desabilitados com mask money
    if (
      ['money', 'number', 'numberZeroLeft', 'percentage', 'kg'].includes(mask as string) &&
      !other.disabled
    ) {
      setValue(name, fNumber(mask as TfNumber, watch(name)));
    }
  }, []);

  useEffect(() => {
    if (mask && type !== 'string') {
      setValue('mask', setDeep(watch('mask'), name, mask));
    }
  }, [mask, watch(name)]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          placeholder={handlePlaceholder()}
          type={type || 'text'}
          value={
            mask && !other.disabled
              ? (Mask as any)?.[mask]?.(field.value)
              : mask === 'money' && other.disabled
              ? fNumber(
                  'money',
                  typeof field.value === 'string' ? fNumber('float', field.value) : field.value,
                )
              : field.value
          }
          onChange={(event) => handleOnChange(event, field)}
          error={!!error}
          helperText={error ? error?.message : helperText}
          InputProps={{ readOnly, ...handleInputProps() }}
          {...other}
        />
      )}
    />
  );
}
