import { alpha, Theme } from '@mui/material/styles';



export function paper(theme: Theme) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        outlined: {
          borderColor: alpha(theme.palette.grey[500], 0.12),
          borderWidth: '1.5px',
        },
        elevation1: {
          boxShadow: theme.customShadows.z1,
        },
        elevation4: {
          boxShadow: theme.customShadows.z4,
        },
        elevation8: {
          boxShadow: theme.customShadows.z8,
        },
      },
    },
  };
}
