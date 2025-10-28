import { Card, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFTextField } from '@/components/hook-form';

export function TipoLocalFormInformacoes() {
  return (
    <Grid xs={12}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={3} columnSpacing={2}>
            <Grid xs={12}>
              <Typography variant="h6">Informações do Tipo de Local</Typography>
            </Grid>

            <Grid xs={12}>
              <RHFTextField
                name="descricao"
                label="Descrição"
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
