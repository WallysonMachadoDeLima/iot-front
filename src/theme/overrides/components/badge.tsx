import { badgeClasses, BadgeProps } from '@mui/material/Badge';
import { Theme } from '@mui/material/styles';



// NEW VARIANT
declare module '@mui/material/Badge' {
  interface BadgePropsVariantOverrides {
    alway: true;
    busy: true;
    online: true;
    offline: true;
    invisible: true;
  }
}

export function badge(theme: Theme) {
  return {
    MuiBadge: {
      styleOverrides: {
        dot: {
          borderRadius: '50%',
        },
        badge: {
          fontWeight: 600,
          fontSize: '0.75rem',
        },
        root: ({ ownerState }: { ownerState: BadgeProps }) => {
          const alway = ownerState.variant === 'alway';

          const online = ownerState.variant === 'online';

          const busy = ownerState.variant === 'busy';

          const offline = ownerState.variant === 'offline';

          const invisible = ownerState.variant === 'invisible';

          const baseStyles = {
            [`&.${badgeClasses.invisible}`]: {
              transform: 'unset',
            },
            width: 10,
            zIndex: 9,
            padding: 0,
            height: 10,
            minWidth: 'auto',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:before, &:after': {
              content: "''",
              borderRadius: 1,
              backgroundColor: theme.palette.common.white,
            },
          };

          return {
            ...(online && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.success.main,
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
              },
            }),
            ...(busy && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.error.main,
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                '&:before': { width: 6, height: 2 },
              },
            }),
            ...(offline && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.text.disabled,
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                '&:before': {
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                },
              },
            }),
            ...(alway && {
              [`& .${badgeClasses.badge}`]: {
                ...baseStyles,
                backgroundColor: theme.palette.warning.main,
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                '&:before': {
                  width: 2,
                  height: 4,
                  transform: 'translateX(1px) translateY(-1px)',
                },
                '&:after': {
                  width: 2,
                  height: 4,
                  transform: 'translateY(1px) rotate(125deg)',
                },
              },
            }),
            ...(invisible && {
              [`& .${badgeClasses.badge}`]: {
                display: 'none',
              },
            }),
          };
        },
      },
    },
  };
}
