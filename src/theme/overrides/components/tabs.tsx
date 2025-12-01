import { alpha, Theme } from '@mui/material/styles';
import { tabClasses } from '@mui/material/Tab';



export function tabs(theme: Theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 48,
        },
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          backgroundColor: theme.palette.primary.main,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        scrollButtons: {
          width: 48,
          borderRadius: '50%',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5, 2),
          opacity: 1,
          minWidth: 48,
          minHeight: 48,
          fontWeight: 500,
          borderRadius: theme.shape.borderRadius,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:not(:last-of-type)': {
            marginRight: theme.spacing(1),
            [theme.breakpoints.up('sm')]: {
              marginRight: theme.spacing(2),
            },
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
          [`&:not(.${tabClasses.selected})`]: {
            color: theme.palette.text.secondary,
          },
          [`&.${tabClasses.selected}`]: {
            fontWeight: 600,
            color: theme.palette.primary.main,
          },
        },
      },
    },
  };
}
