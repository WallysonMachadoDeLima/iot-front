'use client';

import {
  Box,
  Button,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Switch,
  TextField,
} from '@mui/material';

import Iconify from '@/components/iconify';



type PropsFilter = {
  searchBarApi: string;
  setSearchBarApi: any;
  totalItemsApi: number;
};

export const LocalFilter = ({ searchBarApi, setSearchBarApi, totalItemsApi }: PropsFilter) => {
  const handleSearchBarApi = (event: any) => {
    setSearchBarApi(event.target.value);
  };

  const ClearSerchBar = () => {
    setSearchBarApi('');
  };

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: 2.5,
          pl: 2.5,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            placeholder="Pesquise..."
            value={searchBarApi}
            onChange={handleSearchBarApi}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        {searchBarApi && (
          <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
            <Button
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={ClearSerchBar}
            >
              Limpar
            </Button>
          </Stack>
        )}
      </Stack>

      {searchBarApi && (
        <Stack
          spacing={1.5}
          sx={{
            pr: 2.5,
            pl: 2.5,
            pb: 2,
          }}
        >
          <Box sx={{ typography: 'body2' }}>
            <strong> {totalItemsApi} </strong>
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
              resultados encontrados
            </Box>
          </Box>
        </Stack>
      )}
    </>
  );
};



type PropsPagination = {
  dense: boolean;
  setDense: any;
  quantPagsApi: number;
  pageApi: number;
  setPageApi: any;
  itemsPerPage: number;
  setItemsPerPage: any;
};

export const LocalPagination = ({
  dense,
  setDense,
  quantPagsApi,
  pageApi,
  setPageApi,
  itemsPerPage,
  setItemsPerPage,
}: PropsPagination) => {
  const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25];

  const handleDense = (event: any) => {
    setDense(event.target.checked);
  };

  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(event.target.value);
  };

  const handlePageChange = (_: any, value: any) => {
    setPageApi(value);
  };

  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '15px',
          fontSize: '0.875rem',
        }}
      >
        <FormControlLabel
          value="comprimir"
          control={<Switch color="primary" checked={dense} onChange={handleDense} />}
          label="Comprimir tabela"
          labelPlacement="start"
        />
        <Pagination count={quantPagsApi} page={pageApi} onChange={handlePageChange} />

        <Box>
          <span> Itens por página: </span>
          <Select
            style={{ marginLeft: '10px', width: '65px', height: '35px' }}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </>
  );
};
