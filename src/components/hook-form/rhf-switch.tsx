'use client';

import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

interface Props extends Omit<Partial<FormControlLabelProps>, 'control'> {
  name: string;
  label?: string;
  disabled?: boolean;
  helperText?: React.ReactNode;
  readOnly?: boolean;
  inputProps?: any;
}

export function RHFSwitch({
  name,
  helperText,
  value,
  label,
  disabled = false,
  readOnly = false,
  inputProps,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            label={label || ''}
            control={
              <Switch {...field} checked={field.value} inputProps={{ readOnly, ...inputProps }} />
            }
            {...other}
            disabled={disabled}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}
