import { Card, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFTextField } from '@/components/hook-form';

// ----------------------------------------------------------------------

interface Props {
  isView?: boolean;
}

export function SalaFormInformacoes({ isView }: Props) {
  return (
    <Grid xs={12}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={3} columnSpacing={2}>
            <Grid xs={12}>
              <Typography variant="h6">Informações da Sala</Typography>
            </Grid>

            <Grid xs={12}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <RHFTextField name="nome" label="Nome" />
              </Stack>
            </Grid>

            <Grid xs={12}>
              <RHFTextField
                name="descricao"
                label="Descrição"
                readOnly={isView}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </Grid>
  );
}
