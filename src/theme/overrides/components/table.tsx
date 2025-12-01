import { alpha, Theme } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { tableRowClasses } from '@mui/material/TableRow';



export function table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
          },
          [`&.${tableRowClasses.selected}`]: {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
            },
          },
          '&:last-of-type': {
            [`& .${tableCellClasses.root}`]: {
              borderColor: 'transparent',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomStyle: 'solid',
          borderBottomWidth: '1px',
          borderBottomColor: alpha(theme.palette.grey[500], 0.08),
        },
        head: {
          fontSize: 13,
          color: theme.palette.text.secondary,
          fontWeight: 600,
          backgroundColor: alpha(theme.palette.grey[500], 0.04),
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${alpha(theme.palette.grey[500], 0.04)} 0%, ${alpha(theme.palette.grey[500], 0.04)} 100%)`,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          width: '100%',
          borderTop: `1px solid ${alpha(theme.palette.grey[500], 0.08)}`,
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: 8,
        },
        select: {
          paddingLeft: 8,
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          right: 4,
          width: 16,
          height: 16,
          top: 'calc(50% - 8px)',
        },
      },
    },
  };
}
