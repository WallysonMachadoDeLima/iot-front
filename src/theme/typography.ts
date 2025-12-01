import { Barlow, Public_Sans } from 'next/font/google';
import localFont from 'next/font/local';



export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
  }
}

export const basicl = localFont({
  src: [
    {
      path: '../../public/fonts/basicl.ttf'
    },
  ],
});

export const noMovement = localFont({
  src: [
    {
      path: '../../public/fonts/nomovement.ttf'
    },
  ],
});

export const zeroNero = localFont({
  src: [
    {
      path: '../../public/fonts/zeronero.ttf'
    },
  ],
});

export const primaryFont = Public_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const secondaryFont = Barlow({
  weight: ['900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});



// LEARN MORE
// https://nextjs.org/docs/basic-features/font-optimization#google-fonts

export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 1.2,
    fontSize: pxToRem(40),
    letterSpacing: '-0.02em',
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 1.3,
    fontSize: pxToRem(32),
    letterSpacing: '-0.01em',
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(24),
    letterSpacing: '-0.01em',
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    letterSpacing: '0em',
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    letterSpacing: '0em',
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    letterSpacing: '0em',
    ...responsiveFontSizes({ sm: 17, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: pxToRem(14),
    letterSpacing: '0.01em',
  },
  body1: {
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    letterSpacing: '0.01em',
  },
  body2: {
    lineHeight: 1.6,
    fontSize: pxToRem(14),
    letterSpacing: '0.01em',
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: '0.02em',
  },
  overline: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  button: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    textTransform: 'unset',
    letterSpacing: '0.02em',
  },
} as const;
