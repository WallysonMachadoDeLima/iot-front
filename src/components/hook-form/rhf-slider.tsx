'use client';

import FormHelperText from '@mui/material/FormHelperText';
import Slider, { SliderProps } from '@mui/material/Slider';
import { Controller, useFormContext } from 'react-hook-form';



type Props = SliderProps & {
  name: string;
  helperText?: React.ReactNode;
};

export function RHFSlider({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </>
      )}
    />
  );
}
