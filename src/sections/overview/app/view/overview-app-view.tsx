'use client';

import { useSettingsContext } from '@/components/settings';
import { useSnackbar } from '@/components/snackbar';
import { IDispositivoFindAll, IItemFindAll, ILocalizacaoFindAll } from '@/models';
import { dispositivoService, itemService, localizacaoService } from '@/services';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { RoomCard, RoomItemsModal } from '../components';

export default function OverviewAppView() {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const [rooms, setRooms] = useState<ILocalizacaoFindAll[]>([]);
  const [items, setItems] = useState<IItemFindAll[]>([]);
  const [devices, setDevices] = useState<IDispositivoFindAll[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRoom, setSelectedRoom] = useState<ILocalizacaoFindAll | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [roomsData, itemsData, devicesData] = await Promise.all([
        localizacaoService.findAll(),
        itemService.findAll(),
        dispositivoService.findAll(),
      ]);

      setRooms(roomsData);
      setItems(itemsData);
      setDevices(devicesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      enqueueSnackbar('Erro ao carregar dados do dashboard', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRoomClick = (room: ILocalizacaoFindAll) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  // Check if room has an active device
  const hasActiveDevice = (roomId: number): boolean => {
    return devices.some(
      (device) => device.fk_id_local === roomId && device.ativo === 1
    );
  };

  // Get items that belong to the room (local_origem)
  const getItemsOwnedByRoom = (roomId: number): IItemFindAll[] => {
    return items.filter((item) => item.fk_id_local_origem === roomId);
  };

  // For "items currently in room", we would need movimento data to track location
  // For now, we'll show items owned by the room as a placeholder
  const getItemsInRoom = (roomId: number): IItemFindAll[] => {
    // TODO: Implement with movimento/leitura data to show current location
    return getItemsOwnedByRoom(roomId);
  };

  if (loading) {
    return (
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Dashboard de Salas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visualize e gerencie todas as salas e seus itens
        </Typography>
      </Box>

      {rooms.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Nenhuma sala cadastrada
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={room.id_local}>
              <RoomCard
                room={room}
                deviceActive={hasActiveDevice(room.id_local)}
                onClick={() => handleRoomClick(room)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {selectedRoom && (
        <RoomItemsModal
          open={modalOpen}
          onClose={handleCloseModal}
          roomName={selectedRoom.nome}
          itemsInRoom={getItemsInRoom(selectedRoom.id_local)}
          itemsOwnedByRoom={getItemsOwnedByRoom(selectedRoom.id_local)}
        />
      )}
    </Container>
  );
}
