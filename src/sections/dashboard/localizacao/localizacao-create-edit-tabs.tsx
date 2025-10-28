import { ITipoLocalCreateEdit } from '@/models';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFFormProvider } from '@/components/hook-form';

import { TipoLocalActions } from './components';
import { TipoLocalFormInformacoes } from './localizacao-form-informacoes';
import { TipoLocalResolver } from './resolver';



type Props = {
  currentData?: ITipoLocalCreateEdit;
  setValues: (value: ITipoLocalCreateEdit) => void;
  finalizeForm: boolean;
  setFinalizeForm: (value: boolean) => void;
  isView?: boolean;
};

export function TipoLocalEditTabs({
  currentData,
  setValues,
  finalizeForm,
  setFinalizeForm,
  isView,
}: Props) {
  const methods = TipoLocalResolver(currentData);

  const onSubmit = (data: ITipoLocalCreateEdit) => {
    setValues(data);
    setFinalizeForm(true);
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <TipoLocalFormInformacoes isView={isView} />

        {!isView && <TipoLocalActions finalizeForm={finalizeForm} />}
      </Grid>
    </RHFFormProvider>
  );
}
