'use client';

import Iconify from '@/components/iconify';
import { IItemFindAll } from '@/models';
import { fDate } from '@/utils/format-time';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { alpha, useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

interface RoomItemsModalProps {
    open: boolean;
    onClose: () => void;
    roomName: string;
    itemsInRoom: IItemFindAll[];
    itemsOwnedByRoom: IItemFindAll[];
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`room-tabpanel-${index}`}
            aria-labelledby={`room-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

export function RoomItemsModal({
    open,
    onClose,
    roomName,
    itemsInRoom,
    itemsOwnedByRoom,
}: RoomItemsModalProps) {
    const [currentTab, setCurrentTab] = useState(0);
    const theme = useTheme();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderItemsTable = (items: IItemFindAll[], emptyMessage: string) => {
        if (items.length === 0) {
            return (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        px: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            backgroundColor: alpha(theme.palette.text.disabled, 0.08),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            mb: 2,
                        }}
                    >
                        <Iconify
                            icon="mdi:package-variant"
                            width={50}
                            sx={{ color: theme.palette.text.disabled }}
                        />
                    </Box>
                    <Typography variant="h6" color="text.secondary">
                        {emptyMessage}
                    </Typography>
                </Box>
            );
        }

        return (
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tag</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Localização Origem</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Data Criação</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow
                                key={item.id_item}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                    },
                                }}
                            >
                                <TableCell>
                                    <Chip
                                        label={item.tag_codigo}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2">{item.nome}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.descricao || '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {item.local_origem?.nome || '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.ativo ? 'Ativo' : 'Inativo'}
                                        size="small"
                                        color={item.ativo ? 'success' : 'error'}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" color="text.secondary">
                                        {fDate(item.criado_em)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    minHeight: '500px',
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="mdi:door-open" width={28} />
                    <Typography variant="h5" component="span">
                        {roomName}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small">
                    <Iconify icon="mdi:close" />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        aria-label="room items tabs"
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: 48,
                            },
                        }}
                    >
                        <Tab
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Iconify icon="mdi:map-marker" width={20} />
                                    Itens Atualmente na Sala
                                    <Chip
                                        label={itemsInRoom.length}
                                        size="small"
                                        color="primary"
                                        sx={{ ml: 0.5 }}
                                    />
                                </Box>
                            }
                            id="room-tab-0"
                            aria-controls="room-tabpanel-0"
                        />
                        <Tab
                            label={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Iconify icon="mdi:home" width={20} />
                                    Itens que Pertencem à Sala
                                    <Chip
                                        label={itemsOwnedByRoom.length}
                                        size="small"
                                        color="secondary"
                                        sx={{ ml: 0.5 }}
                                    />
                                </Box>
                            }
                            id="room-tab-1"
                            aria-controls="room-tabpanel-1"
                        />
                    </Tabs>
                </Box>

                <TabPanel value={currentTab} index={0}>
                    {renderItemsTable(
                        itemsInRoom,
                        'Nenhum item está atualmente nesta sala'
                    )}
                </TabPanel>

                <TabPanel value={currentTab} index={1}>
                    {renderItemsTable(
                        itemsOwnedByRoom,
                        'Nenhum item pertence originalmente a esta sala'
                    )}
                </TabPanel>
            </DialogContent>
        </Dialog>
    );
}
