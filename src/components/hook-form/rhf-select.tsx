'use client';

import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { SxProps, Theme } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  PaperPropsSx?: SxProps<Theme>;
  noOptionsText?: string;
  cleanFild?: boolean;
};

export function RHFSelect({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  PaperPropsSx,
  noOptionsText,
  cleanFild,
  ...other
}: RHFSelectProps) {
  const { control, watch } = useFormContext();

  const hasChildren = React.Children.count(children) > 0;

  const options = hasChildren ? (
    children
  ) : (
    <MenuItem disabled value="">
      {noOptionsText || 'Nenhuma opções disponíveis'}
    </MenuItem>
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{
            native,
            MenuProps: {
              PaperProps: {
                sx: {
                  ...(!native && {
                    maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                  }),
                  ...PaperPropsSx,
                },
              },
            },
            sx: { textTransform: 'capitalize' },
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {cleanFild && !['', null, undefined].includes(watch(name)) && (
            <MenuItem value="">
              <em>Limpar Campo</em>
            </MenuItem>
          )}
          {options}
        </TextField>
      )}
    />
  );
}

// ----------------------------------------------------------------------
