
import { IItemCreateEdit } from '@/models';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFFormProvider } from '@/components/hook-form';

import { ItemActions } from './components/item-actions';
import { ItemFormInformacoes } from './item-form-informacoes';
import { ItemResolver } from './resolver/item-resolver';

type Props = {
  currentData?: IItemCreateEdit;
  setValues: (value: IItemCreateEdit) => void;
  finalizeForm: boolean;
  setFinalizeForm: (value: boolean) => void;
};

export function ItemEditTabs({
  currentData,
  setValues,
  finalizeForm,
  setFinalizeForm,
}: Props) {
  const methods = ItemResolver(currentData);

  const onSubmit = (data: IItemCreateEdit) => {
    setValues(data);
    setFinalizeForm(true);
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <ItemFormInformacoes />

        <ItemActions finalizeForm={finalizeForm} />
      </Grid>
    </RHFFormProvider>
  );
}
