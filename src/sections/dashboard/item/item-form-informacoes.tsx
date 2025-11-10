
import { Card, MenuItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';

import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/hook-form';
import { ILocalizacaoFindAll } from '@/models';
import { localizacaoService } from '@/services';

export function ItemFormInformacoes() {
  const [locais, setLocais] = useState<ILocalizacaoFindAll[]>([]);

  useEffect(() => {
    localizacaoService
      .findAll()
      .then((res) => setLocais(res))
      .catch(() => setLocais([]));
  }, []);

  return (
    <Grid xs={12}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={3} columnSpacing={2}>
            <Grid xs={12}>
              <Typography variant="h6">Informações do Item</Typography>
            </Grid>
            <Grid xs={12}>
              <RHFSwitch name="ativo" label="Ativo" />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFTextField name="tag_codigo" label="Tag/Código" />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFTextField name="nome" label="Nome" />
            </Grid>

            <Grid xs={12} md={12}>
              <RHFTextField name="descricao" label="Descrição" multiline rows={3} />
            </Grid>

            <Grid xs={12} md={6}>
              <RHFSelect name="fk_id_local_origem" label="Local de Origem">
                {locais.map((local) => (
                  <MenuItem key={local.id_local} value={local.id_local}>
                    {local.nome}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
          </Grid>
        </Stack>
      </Card>
    </Grid>
  );
}
