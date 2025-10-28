import ThemeProvider from '@/theme';
import localFont from 'next/font/local';

import { AuthConsumer, AuthProvider } from '@/auth/context';
import MotionLazy from '@/components/animate/motion-lazy';
import ProgressBar from '@/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from '@/components/settings';
import SnackbarProvider from '@/components/snackbar/snackbar-provider';
import { LocalizationProvider } from '@/theme/locales';

import 'src/theme/css';
import 'src/theme/locales/i18n';



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
                themeMode: 'light',
                themeDirection: 'ltr',
                themeContrast: 'default',
                themeLayout: 'vertical',
                themeColorPresets: 'default',
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
