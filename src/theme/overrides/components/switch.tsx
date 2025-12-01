import { alpha, Theme } from '@mui/material/styles';
import { switchClasses, SwitchProps } from '@mui/material/Switch';



export function switches(theme: Theme) {
  const lightMode = theme.palette.mode === 'light';

  const rootStyles = (ownerState: SwitchProps) => ({
    padding: '9px 13px 9px 12px',
    width: 58,
    height: 38,
    ...(ownerState.size === 'small' && {
      padding: '4px 8px 4px 7px',
      width: 40,
      height: 24,
    }),
    [`& .${switchClasses.thumb}`]: {
      width: 14,
      height: 14,
      boxShadow: theme.customShadows.z4,
      color: theme.palette.common.white,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      ...(ownerState.size === 'small' && {
        width: 10,
        height: 10,
      }),
    },
    [`& .${switchClasses.track}`]: {
      opacity: 1,
      borderRadius: 14,
      backgroundColor: alpha(theme.palette.grey[500], 0.32),
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    [`& .${switchClasses.switchBase}`]: {
      left: 3,
      padding: 12,
      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      ...(ownerState.size === 'small' && {
        padding: 7,
      }),
      [`&.${switchClasses.checked}`]: {
        transform: 'translateX(13px)',
        [`& .${switchClasses.thumb}`]: {
          boxShadow: theme.customShadows.primary,
        },
        [`&+.${switchClasses.track}`]: {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
        },
        ...(ownerState.size === 'small' && {
          transform: 'translateX(9px)',
        }),
      },
      [`&.${switchClasses.disabled}`]: {
        [`& .${switchClasses.thumb}`]: {
          opacity: lightMode ? 1 : 0.48,
        },
        [`&+.${switchClasses.track}`]: {
          opacity: 0.32,
        },
      },
    },
  });

  return {
    MuiSwitch: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: SwitchProps }) => rootStyles(ownerState),
      },
    },
  };
}
