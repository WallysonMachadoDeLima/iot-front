import { ILocalizacaoCreateEdit } from '@/models';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFFormProvider } from '@/components/hook-form';

import { LocalizacaoActions } from './components';
import { LocalizacaoFormInformacoes } from './localizacao-form-informacoes';
import { LocalizacaoResolver } from './resolver';



type Props = {
  currentData?: ILocalizacaoCreateEdit;
  setValues: (value: ILocalizacaoCreateEdit) => void;
  finalizeForm: boolean;
  setFinalizeForm: (value: boolean) => void;
};

export function LocalizacaoEditTabs({
  currentData,
  setValues,
  finalizeForm,
  setFinalizeForm,
}: Props) {
  const methods = LocalizacaoResolver(currentData);

  const onSubmit = (data: ILocalizacaoCreateEdit) => {
    setValues(data);
    setFinalizeForm(true);
  };

  return (
    <RHFFormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <LocalizacaoFormInformacoes />

        <LocalizacaoActions finalizeForm={finalizeForm} />
      </Grid>
    </RHFFormProvider>
  );
}
