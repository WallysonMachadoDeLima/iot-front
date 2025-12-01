import { alpha } from '@mui/material/styles';



export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS - MODERN PALETTE

const GREY = {
  0: '#FFFFFF',
  100: '#F8FAFC',
  200: '#F1F5F9',
  300: '#E2E8F0',
  400: '#CBD5E1',
  500: '#94A3B8',
  600: '#64748B',
  700: '#475569',
  800: '#1E293B',
  900: '#0F172A',
};

const PRIMARY = {
  lighter: '#E0E7FF',
  light: '#A5B4FC',
  main: '#6366F1',
  dark: '#4338CA',
  darker: '#312E81',
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#FCE7F3',
  light: '#F9A8D4',
  main: '#EC4899',
  dark: '#BE185D',
  darker: '#831843',
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#E0F2FE',
  light: '#7DD3FC',
  main: '#0EA5E9',
  dark: '#0369A1',
  darker: '#0C4A6E',
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#D1FAE5',
  light: '#6EE7B7',
  main: '#10B981',
  dark: '#059669',
  darker: '#065F46',
  contrastText: '#ffffff',
};

const WARNING = {
  lighter: '#FEF3C7',
  light: '#FCD34D',
  main: '#F59E0B',
  dark: '#D97706',
  darker: '#92400E',
  contrastText: '#FFFFFF',
};

const ERROR = {
  lighter: '#FEE2E2',
  light: '#FCA5A5',
  main: '#EF4444',
  dark: '#DC2626',
  darker: '#991B1B',
  contrastText: '#FFFFFF',
};

const COMMON = {
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.2),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[900],
      secondary: GREY[600],
      disabled: GREY[400],
    },
    background: {
      paper: '#FFFFFF',
      default: GREY[100],
      neutral: GREY[200],
    },
    action: {
      ...COMMON.action,
      active: GREY[700],
    },
  };

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: GREY[100],
      secondary: GREY[400],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[400],
    },
  };

  return mode === 'light' ? light : dark;
}
