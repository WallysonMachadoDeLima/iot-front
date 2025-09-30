import { JwtLoginView } from '@/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'IOT',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
