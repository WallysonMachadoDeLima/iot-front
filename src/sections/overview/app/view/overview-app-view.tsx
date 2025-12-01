'use client';

import { useSettingsContext } from '@/components/settings';
import { useSnackbar } from '@/components/snackbar';
import { IDispositivoFindAll, IItemFindAll, ILocalizacaoFindAll, IMovimentoFindAll } from '@/models';
import { dispositivoService, itemService, localizacaoService, movimentoService } from '@/services';
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
  const [movements, setMovements] = useState<IMovimentoFindAll[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRoom, setSelectedRoom] = useState<ILocalizacaoFindAll | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [roomsData, itemsData, devicesData, movementsData] = await Promise.all([
        localizacaoService.findAll(),
        itemService.findAll(),
        dispositivoService.findAll(),
        movimentoService.findAll(),
      ]);

      setRooms(roomsData);
      setItems(itemsData);
      setDevices(devicesData);
      setMovements(movementsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      enqueueSnackbar('Erro ao carregar dados do dashboard', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const [roomsData, itemsData, devicesData, movementsData] = await Promise.all([
        localizacaoService.findAll(),
        itemService.findAll(),
        dispositivoService.findAll(),
        movimentoService.findAll(),
      ]);

      setRooms(roomsData);
      setItems(itemsData);
      setDevices(devicesData);
      setMovements(movementsData);
    }, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
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

  // Get current location of an item based on last movement
  const getCurrentLocationOfItem = (itemId: number): number | null => {
    // Filter movements for this item and sort by date (most recent first)
    const itemMovements = movements
      .filter((mov) => mov.fk_id_item === itemId)
      .sort((a, b) => new Date(b.movido_em).getTime() - new Date(a.movido_em).getTime());

    // If there are movements, return the destination of the most recent one
    if (itemMovements.length > 0) {
      return itemMovements[0].fk_id_local_destino;
    }

    // If no movements, the item is still at its origin location
    const item = items.find((i) => i.id_item === itemId);
    return item ? item.fk_id_local_origem : null;
  };

  // Get items currently in the room based on movements
  const getItemsInRoom = (roomId: number): IItemFindAll[] => {
    return items.filter((item) => {
      const currentLocation = getCurrentLocationOfItem(item.id_item);
      return currentLocation === roomId;
    });
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
          Dashboard de Localizações
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visualize e gerencie todas as localizações e seus itens
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
