import { Card, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { RHFTextField } from '@/components/hook-form';

export function MovimentoFormInformacoes() {
  return (
    <Grid xs={12}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={3} columnSpacing={2}>
            <Grid xs={12}>
              <Typography variant="h6">Informações da Movimentação</Typography>
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
