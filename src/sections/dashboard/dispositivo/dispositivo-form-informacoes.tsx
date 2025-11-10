import { Card, MenuItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';

import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/hook-form';
import { localizacaoService } from '@/services';
import { ILocalizacaoFindAll } from '@/models';

export function DispositivoFormInformacoes() {
  const [localizacoes, setLocalizacoes] = useState<ILocalizacaoFindAll[]>([]);

  useEffect(() => {
    localizacaoService
      .findAll()
      .then((res) => setLocalizacoes(res))
      .catch(() => setLocalizacoes([]));
  }, []);

  return (
    <Grid xs={12}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={3} columnSpacing={2}>
            <Grid xs={12}>
              <Typography variant="h6">Informações do Dispositivo</Typography>
            </Grid>
            <Grid xs={12}>
              <RHFSwitch name="ativo" label="Ativo" />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFSelect name="fk_id_local" label="Local">
                {localizacoes.map((l) => (
                  <MenuItem key={l.id_local} value={l.id_local}>
                    {l.nome}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>

            <Grid xs={12} md={6}>
              <RHFTextField name="identificador" label="Identificador" />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFTextField name="tipo" label="Tipo" />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFTextField name="descricao" label="Descrição" multiline rows={3} />
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </Grid>
  );
}
