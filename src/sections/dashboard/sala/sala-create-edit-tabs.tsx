import { ISalaCreateEdit } from '@/models';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFFormProvider } from '@/components/hook-form';

import { SalaActions } from './components';
import { SalaResolver } from './resolver';
import { SalaFormInformacoes } from './sala-form-informacoes';

// ----------------------------------------------------------------------

type Props = {
  currentData?: ISalaCreateEdit;
  setValues: (value: ISalaCreateEdit) => void;
  finalizeForm: boolean;
  setFinalizeForm: (value: boolean) => void;
  isView?: boolean;
};

export function SalaEditTabs({
  currentData,
  setValues,
  finalizeForm,
  setFinalizeForm,
  isView,
}: Props) {
  const methods = SalaResolver(currentData);

  const onSubmit = (data: ISalaCreateEdit) => {
    setValues(data);
    setFinalizeForm(true);
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <SalaFormInformacoes isView={isView} />

        {!isView && <SalaActions finalizeForm={finalizeForm} />}
      </Grid>
    </RHFFormProvider>
  );
}
