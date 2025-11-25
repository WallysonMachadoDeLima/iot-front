
import { Card, MenuItem, Stack, Typography, Button, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { RHFSelect, RHFSwitch, RHFTextField } from '@/components/hook-form';
import { ILocalizacaoFindAll } from '@/models';
import { localizacaoService, leituraService } from '@/services';
import { useSnackbar } from '@/components/snackbar';

export function ItemFormInformacoes() {
  const [locais, setLocais] = useState<ILocalizacaoFindAll[]>([]);
  const [loading, setLoading] = useState(false);
  const { setValue } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    localizacaoService
      .findAll()
      .then((res) => setLocais(res))
      .catch(() => setLocais([]));
  }, []);

  const handleGetLastTag = async () => {
    setLoading(true);
    try {
      const lastReading = await leituraService.getLastReading();
      if (lastReading && lastReading.tag_codigo) {
        setValue('tag_codigo', lastReading.tag_codigo);
        enqueueSnackbar('Tag preenchida com a última leitura!', { variant: 'success' });
      } else {
        enqueueSnackbar('Nenhuma leitura encontrada', { variant: 'warning' });
      }
    } catch (error) {
      enqueueSnackbar('Erro ao buscar última leitura', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

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

            <Grid xs={12} md={4}>
              <RHFTextField name="nome" label="Nome" />
            </Grid>
            <Grid xs={12} md={4}>
              <Stack direction="row" spacing={1} alignItems="flex-end">
                <RHFTextField name="tag_codigo" label="Tag/Código" sx={{ flex: 1 }} />
                <Button 
                  variant="contained" 
                  onClick={handleGetLastTag}
                  disabled={loading}
                  sx={{ minWidth: 180, height: 56 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Buscar Última Tag'}
                </Button>
              </Stack>
            </Grid>


            <Grid xs={12} md={4}>
              <RHFSelect name="fk_id_local_origem" label="Local de Origem">
                {locais.map((local) => (
                  <MenuItem key={local.id_local} value={local.id_local}>
                    {local.nome}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Grid>
            <Grid xs={12}>
              <RHFTextField name="descricao" label="Descrição" multiline rows={3} />
            </Grid>


          </Grid>
        </Stack>
      </Card>
    </Grid>
  );
}
