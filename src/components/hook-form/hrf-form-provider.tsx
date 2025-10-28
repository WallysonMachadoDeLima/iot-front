'use client';

import { fDate, fNumber } from '@/utils';
import { useEffect } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';



interface Props {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: (data: any) => void;
  activateForm?: boolean;
  setActivateForm?: (activate: boolean) => void;
}

export function RHFFormProvider({
  children,
  onSubmit,
  methods,
  activateForm,
  setActivateForm,
}: Props) {
  const handleFormSubmit = methods.handleSubmit((data) => {
    const listfieldsNumbers = ['money', 'number', 'numberZeroLeft', 'percentage'];

    const { mask, ...rest } = data;

    if (!mask) {
      if (onSubmit) {
        onSubmit(rest);
      }
      return;
    }

    function getMaskPaths(mask: any, prefix = '') {
      const paths: any = [];
      Object.keys(mask)?.forEach((key) => {
        const value = mask[key];
        const path = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          paths.push(...getMaskPaths(value, path));
        } else {
          paths.push({ path, value });
        }
      });
      return paths as any;
    }

    function getValue(obj: any, path: any) {
      return path.split('.').reduce((a: any, c: any) => (a ? a[c] : undefined), obj);
    }

    function setValue(obj: any, path: any, value: any) {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const target = keys.reduce((a: any, c: any) => (a ? a[c] : undefined), obj);
      if (target && lastKey) {
        target[lastKey] = value;
      }
    }

    const maskPaths = getMaskPaths(mask);

    const fieldsNumbers = maskPaths
      ?.filter(({ value }: any) => listfieldsNumbers.includes(value))
      ?.map(({ path }: any) => path);

    const fieldsStrings = maskPaths
      ?.filter(({ value }: any) => ![...listfieldsNumbers, 'date'].includes(value))
      ?.map(({ path }: any) => path);

    const fieldsDate = maskPaths
      ?.filter(({ value }: any) => value === 'date')
      ?.map(({ path }: any) => path);

    fieldsNumbers.forEach((path: any) => {
      const value = getValue(rest, path);
      if (value !== undefined) {
        const newValue = fNumber('float', value);
        setValue(rest, path, newValue);
      }
    });

    fieldsStrings?.forEach((path: any) => {
      const value = getValue(rest, path);
      if (value !== undefined) {
        const newValue = !isNaN(Number(value))
          ? value
          : value === null
            ? null
            : value?.toString().trim();
        setValue(rest, path, newValue);
      }
    });

    fieldsDate.forEach((path: any) => {
      const value = getValue(rest, path);
      if (value !== undefined) {
        const newValue = fDate('yyyy-MM-dd', value);
        setValue(rest, path, newValue);
      }
    });

    if (onSubmit) {
      onSubmit(rest);
    }
  });

  useEffect(() => {
    if (activateForm) {
      handleFormSubmit();
      if (setActivateForm) setActivateForm(false);
    }
  }, [activateForm]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit}>{children}</form>
    </FormProvider>
  );
}
