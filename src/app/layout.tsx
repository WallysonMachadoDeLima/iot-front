// i18n
import 'src/theme/locales/i18n';
// scrollbar
import 'simplebar-react/dist/simplebar.min.css';
// lightbox
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
// map
import 'mapbox-gl/dist/mapbox-gl.css';
// editor
import 'react-quill/dist/quill.snow.css';
// carousel
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// theme

import ThemeProvider from '@/theme';

// ----------------------------------------------------------------------

// locales
import { LocalizationProvider } from '@/theme/locales';

import 'src/theme/css.css';

import localFont from 'next/font/local';

// auth
import { AuthConsumer, AuthProvider } from '@/auth/context/jwt';
import MotionLazy from '@/components/animate/motion-lazy';
import ProgressBar from '@/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from '@/components/settings';
import SnackbarProvider from '@/components/snackbar/snackbar-provider';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Iot',
  description: 'Sistema para controle e gerenciamento de dispositivos IoT',
  keywords: [
    'iot',
    'identificação',
    'controle',
    'gerenciamento',
    'dispositivos',
    'sensores',
    'automação',
    'monitoramento',
    'análise de dados',
  ],
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/assets/logo/logo_single.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/logo/logo_single.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/assets/logo/logo_single.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/assets/logo/logo_single.png',
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

const myFont = localFont({ src: './no-move.ttf' });

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-br" className={myFont.className}>
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', // 'light' | 'v'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: true,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <SettingsDrawer />
                    <ProgressBar />
                    <AuthConsumer>{children}</AuthConsumer>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
