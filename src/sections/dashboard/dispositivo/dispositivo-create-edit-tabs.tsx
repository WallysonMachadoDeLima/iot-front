import { IDispositivoCreateEdit } from '@/models';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFFormProvider } from '@/components/hook-form';

import { DispositivoActions } from './components/dispositivo-actions';
import { DispositivoFormInformacoes } from './dispositivo-form-informacoes';
import { DispositivoResolver } from './resolver/dispositivo-resolver';

type Props = {
  currentData?: IDispositivoCreateEdit;
  setValues: (value: IDispositivoCreateEdit) => void;
  finalizeForm: boolean;
  setFinalizeForm: (value: boolean) => void;
};

export function DispositivoCreateEditTabs({
  currentData,
  setValues,
  finalizeForm,
  setFinalizeForm,
}: Props) {
  const methods = DispositivoResolver(currentData);

  const onSubmit = (data: IDispositivoCreateEdit) => {
    setValues(data);
    setFinalizeForm(true);
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <DispositivoFormInformacoes />

        <DispositivoActions finalizeForm={finalizeForm} />
      </Grid>
    </RHFFormProvider>
  );
}
