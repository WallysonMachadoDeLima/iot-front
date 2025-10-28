import { Card, MenuItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';

import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/hook-form';
import { tipoLocalService } from '@/services';

type Tipo = { id_tipolocal: number; descricao: string };


export function LocalizacaoFormInformacoes() {
  const [tipos, setTipos] = useState<Tipo[]>([]);

  useEffect(() => {
    tipoLocalService
      .findAll()
      .then((res) => setTipos(res))
      .catch(() => setTipos([]));
  }, []);

  return (
    <Grid xs={12}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={3} columnSpacing={2}>
            <Grid xs={12}>
              <Typography variant="h6">Informações da Localização</Typography>
            </Grid>
            <Grid xs={12}>
              <RHFSwitch name="ativo" label="Ativo" />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFSelect name="fk_id_tipolocal" label="Tipo de Local">
                {tipos.map((t) => (
                  <MenuItem key={t.id_tipolocal} value={t.id_tipolocal}>
                    {t.descricao}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>

            <Grid xs={12} md={6}>
              <RHFTextField name="nome" label="Nome" />
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </Grid>
  );
}
