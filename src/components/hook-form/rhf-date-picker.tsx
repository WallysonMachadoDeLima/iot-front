'use client';

import { useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  minDate?: Date;
  maxDate?: Date;
  size?: 'small' | 'medium';
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

export function RHFDatePicker({
  name,
  label,
  disabled = false,
  value,
  defaultValue,
  minDate,
  maxDate,
  size = 'medium',
  ...other
}: Props) {
  const { control, setValue, watch } = useFormContext();

  const formatDate = (date: string) => {
    if (date.length === 10) return new Date(`${date}T00:00:00`);

    return new Date(date);
  };

  useEffect(() => setValue('mask', setDeep(watch('mask'), name, 'date')), []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isDateValid = field.value && !isNaN(Date.parse(field.value));

        return (
          <DatePicker
            disabled={disabled}
            className=""
            format="dd/MM/yyyy"
            label={label || ''}
            value={value ? formatDate(value) : isDateValid ? formatDate(field.value) : null}
            defaultValue={defaultValue && new Date(defaultValue)}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            minDate={minDate}
            maxDate={maxDate}
            slotProps={{
              textField: {
                size: size,
                fullWidth: true,
                error: !!error,
                helperText: !!error ? error.message : '',
                placeholder: 'DD/MM/AAAA',
              },
            }}
            {...other}
          />
        );
      }}
    />
  );
}
