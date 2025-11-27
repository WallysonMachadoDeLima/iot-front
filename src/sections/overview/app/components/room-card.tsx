'use client';

import { ILocalizacaoFindAll } from '@/models';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

interface RoomCardProps {
    room: ILocalizacaoFindAll;
    deviceActive: boolean;
    onClick: () => void;
}

export function RoomCard({ room, deviceActive, onClick }: RoomCardProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: '100%',
                position: 'relative',
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                },
            }}
        >
            <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
                <CardContent
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        position: 'relative',
                    }}
                >
                    {/* Status Badge */}
                    <Tooltip title={deviceActive ? 'Dispositivo ativo' : 'Dispositivo inativo'}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: deviceActive
                                    ? theme.palette.success.main
                                    : theme.palette.error.main,
                                boxShadow: `0 0 0 4px ${alpha(
                                    deviceActive ? theme.palette.success.main : theme.palette.error.main,
                                    0.16
                                )}`,
                                animation: deviceActive ? 'pulse 2s infinite' : 'none',
                                '@keyframes pulse': {
                                    '0%, 100%': {
                                        opacity: 1,
                                    },
                                    '50%': {
                                        opacity: 0.5,
                                    },
                                },
                            }}
                        />
                    </Tooltip>

                    {/* Room Icon */}
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                        }}
                    >
                        <Box
                            component="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={theme.palette.primary.main}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 3v18" />
                            <path d="M9 12h12" />
                        </Box>
                    </Box>

                    {/* Room Name */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            textAlign: 'center',
                            mb: 0.5,
                        }}
                    >
                        {room.nome}
                    </Typography>

                    {/* Room Type */}
                    {room.tipo && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: 'center' }}
                        >
                            {room.tipo}
                        </Typography>
                    )}

                    {/* Active Status */}
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 1,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: room.ativo
                                ? alpha(theme.palette.success.main, 0.08)
                                : alpha(theme.palette.error.main, 0.08),
                            color: room.ativo
                                ? theme.palette.success.main
                                : theme.palette.error.main,
                            fontWeight: 600,
                        }}
                    >
                        {room.ativo ? 'Ativa' : 'Inativa'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
