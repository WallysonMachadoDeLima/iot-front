import { RHFDatePicker, RHFTextField } from '@/components/hook-form';
import { Box, Grid, Typography } from '@mui/material';

interface FiltrosMovimentacaoProps {
    showFiltros: boolean;
}

export function FiltrosMovimentacao({ showFiltros }: FiltrosMovimentacaoProps) {
    if (!showFiltros) return null;

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: 1,
                backgroundColor: 'background.neutral',
                mb: 2,
            }}
        >
            <Typography variant="subtitle2" gutterBottom>
                Filtros do Relatório
            </Typography>
            
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <RHFDatePicker
                        name="dataInicio"
                        label="Data Início"
                        slotProps={{
                            textField: {
                                size: 'small',
                                fullWidth: true,
                            },
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <RHFDatePicker
                        name="dataFim"
                        label="Data Fim"
                        slotProps={{
                            textField: {
                                size: 'small',
                                fullWidth: true,
                            },
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <RHFTextField
                        name="tagCodigo"
                        label="Tag RFID (opcional)"
                        size="small"
                        placeholder="Ex: TAG-ITEM1"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}