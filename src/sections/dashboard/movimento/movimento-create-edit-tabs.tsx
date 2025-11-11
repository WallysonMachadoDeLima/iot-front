import { IMovimentoCreateEdit } from '@/models';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFFormProvider } from '@/components/hook-form';

import { MovimentoActions } from './components';
import { MovimentoResolver } from './resolver';
import { MovimentoFormInformacoes } from './movimento-form-informacoes';



type Props = {
  currentData?: IMovimentoCreateEdit;
  setValues: (value: IMovimentoCreateEdit) => void;
  finalizeForm: boolean;
  setFinalizeForm: (value: boolean) => void;
  isView?: boolean;
};

export function MovimentoEditTabs({
  currentData,
  setValues,
  finalizeForm,
  setFinalizeForm,
  isView,
}: Props) {
  const methods = MovimentoResolver(currentData);

  const onSubmit = (data: IMovimentoCreateEdit) => {
    setValues(data);
    setFinalizeForm(true);
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <MovimentoFormInformacoes />

        <MovimentoActions finalizeForm={finalizeForm} />
      </Grid>
    </RHFFormProvider>
  );
}
